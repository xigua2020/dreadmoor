import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbDetail from "@/components/DbDetail";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bait, baitHref, bySlug, fish, locationHref, materialHref } from "@/lib/data";
import MaybeLink from "@/components/MaybeLink";

export function generateStaticParams() {
  return fish.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(fish, slug);
  if (!entry) return {};
  return buildMetadata({
    title: `${entry.name} – DREADMOOR Fish`,
    description: entry.description ?? `${entry.name} in DREADMOOR: location, bait, rarity and sell value.`,
    path: `/fishing/fish-list/${entry.slug}/`,
    image: entry.image,
  });
}

export default async function FishDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug(fish, slug);
  if (!entry) notFound();
  const baitEntry = entry.bait ? bait.find((b) => b.name === entry.bait) : undefined;
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Fishing", path: "/fishing/" }, { name: "Fish List", path: "/fishing/fish-list/" }, { name: entry.name, path: `/fishing/fish-list/${entry.slug}/` }])} />
      <Breadcrumbs items={[{ name: "Fishing", href: "/fishing/" }, { name: "Fish List", href: "/fishing/fish-list/" }, { name: entry.name }]} />
      <h1 className="font-display mb-6 text-3xl font-bold text-ink">{entry.name}</h1>
      <DbDetail
        name={entry.name}
        image={entry.image}
        description={entry.description}
        facts={[
          { label: "Temperament", value: entry.type },
          { label: "Level", value: entry.level !== undefined ? `Lv ${entry.level}` : undefined },
          { label: "Mutation", value: entry.mutant === undefined ? undefined : entry.mutant ? "Sea Blight mutant" : "Standard" },
          { label: "Habitat", value: entry.location ? <MaybeLink href={locationHref(entry.location)}>{entry.location}</MaybeLink> : undefined },
          {
            label: "Effective Bait",
            value: entry.bait?.split(" / ").map((name, i) => (
              <span key={name}>{i > 0 && " / "}<MaybeLink href={baitHref(name)}>{name}</MaybeLink></span>
            )),
          },
          { label: "Sell Value", value: entry.sellValue },
          {
            label: "Processing",
            value: entry.processing ? (
              <MaybeLink href={materialHref(entry.processing)}>{entry.processing}</MaybeLink>
            ) : undefined,
          },
        ]}
        related={[
          ...(baitEntry ? [{ label: `Bait: ${baitEntry.name}`, href: "/fishing/bait/" }] : []),
          { label: "Fishing Spots", href: "/fishing/fishing-spots/" },
          { label: "Fishing Guide", href: "/fishing/" },
        ]}
      />
    </div>
  );
}
