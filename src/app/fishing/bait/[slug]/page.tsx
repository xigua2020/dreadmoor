import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbDetail from "@/components/DbDetail";
import JsonLd from "@/components/JsonLd";
import MaybeLink from "@/components/MaybeLink";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bait, bySlug, fishHref, materialHref } from "@/lib/data";

export function generateStaticParams() {
  return bait.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(bait, slug);
  if (!entry) return {};
  return buildMetadata({
    title: `${entry.name} – DREADMOOR Bait`,
    description: entry.description ?? `${entry.name} in DREADMOOR: which fish it attracts and how to get it.`,
    path: `/fishing/bait/${entry.slug}/`,
    image: entry.image,
  });
}

export default async function BaitDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug(bait, slug);
  if (!entry) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Fishing", path: "/fishing/" }, { name: "Bait", path: "/fishing/bait/" }, { name: entry.name, path: `/fishing/bait/${entry.slug}/` }])} />
      <Breadcrumbs items={[{ name: "Fishing", href: "/fishing/" }, { name: "Bait & Lures", href: "/fishing/bait/" }, { name: entry.name }]} />
      <h1 className="font-display mb-6 text-3xl font-bold text-ink">{entry.name}</h1>
      <DbDetail
        name={entry.name}
        image={entry.image}
        description={entry.description}
        facts={[
          { label: "Type", value: entry.type },
          { label: "Rarity", value: entry.rarity },
          { label: "Value", value: entry.value },
          { label: "Unlock", value: entry.unlock },
          {
            label: "Used For",
            value: entry.usedFor?.map((name, i) => (
              <span key={name}>{i > 0 && ", "}<MaybeLink href={fishHref(name)}>{name}</MaybeLink></span>
            )),
          },
          {
            label: "Materials",
            value: entry.materials?.map((m, i) => (
              <span key={m.item}>{i > 0 && ", "}<MaybeLink href={materialHref(m.item)}>{m.item} ×{m.qty}</MaybeLink></span>
            )),
          },
          { label: "How to Get", value: entry.howToGet },
        ]}
        related={[
          { label: "Fish List", href: "/fishing/fish-list/" },
          { label: "Fishing Spots", href: "/fishing/fishing-spots/" },
          { label: "Fishing Guide", href: "/fishing/" },
        ]}
      />
    </div>
  );
}
