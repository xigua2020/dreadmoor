import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbDetail from "@/components/DbDetail";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { boatUpgrades, bySlug, materialHref } from "@/lib/data";
import MaybeLink from "@/components/MaybeLink";

export function generateStaticParams() {
  return boatUpgrades.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(boatUpgrades, slug);
  if (!entry) return {};
  return buildMetadata({
    title: `${entry.name} – DREADMOOR Boat Upgrade`,
    description: `${entry.name} in DREADMOOR: ${entry.effect ?? "materials, cost, effect and requirements."}`,
    path: `/boat/upgrades/${entry.slug}/`,
    image: entry.image,
  });
}

export default async function BoatUpgradeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug(boatUpgrades, slug);
  if (!entry) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Boat", path: "/boat/" }, { name: "Upgrades", path: "/boat/upgrades/" }, { name: entry.name, path: `/boat/upgrades/${entry.slug}/` }])} />
      <Breadcrumbs items={[{ name: "Boat", href: "/boat/" }, { name: "Upgrades", href: "/boat/upgrades/" }, { name: entry.name }]} />
      <h1 className="font-display mb-6 text-3xl font-bold text-ink">{entry.name}</h1>
      <DbDetail
        name={entry.name}
        image={entry.image}
        facts={[
          { label: "Component", value: entry.component },
          { label: "Level", value: entry.level },
          { label: "Materials", value: entry.materials?.map((m, i) => (
              <span key={m.item}>
                {i > 0 && ", "}
                <MaybeLink href={materialHref(m.item)}>{m.item} ×{m.qty}</MaybeLink>
              </span>
            )) },
          { label: "Cost", value: entry.cost },
          { label: "Effect", value: entry.effect },
          { label: "Requirements", value: entry.requirements },
        ]}
        related={[
          { label: "Materials & Salvage", href: "/world/resources/" },
          { label: "Boat Guide", href: "/boat/" },
        ]}
      />
    </div>
  );
}
