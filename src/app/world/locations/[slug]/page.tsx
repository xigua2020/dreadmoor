import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbDetail from "@/components/DbDetail";
import JsonLd from "@/components/JsonLd";
import MaybeLink from "@/components/MaybeLink";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bySlug, fishHref, locations, materialHref, questHref } from "@/lib/data";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(locations, slug);
  if (!entry) return {};
  return buildMetadata({
    title: `${entry.name} – DREADMOOR Location`,
    description: entry.description ?? `${entry.name} in DREADMOOR: region, NPCs, fish and resources.`,
    path: `/world/locations/${entry.slug}/`,
    image: entry.image,
  });
}

function linkedList(names: string[] | undefined, resolve: (n: string) => string | null) {
  if (!names?.length) return undefined;
  return names.map((name, i) => (
    <span key={name}>
      {i > 0 && ", "}
      <MaybeLink href={resolve(name)}>{name}</MaybeLink>
    </span>
  ));
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug(locations, slug);
  if (!entry) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Locations", path: "/world/locations/" }, { name: entry.name, path: `/world/locations/${entry.slug}/` }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Locations", href: "/world/locations/" }, { name: entry.name }]} />
      <h1 className="font-display mb-6 text-3xl font-bold text-ink">{entry.name}</h1>
      <DbDetail
        name={entry.name}
        image={entry.image}
        description={entry.description}
        facts={[
          { label: "Region", value: entry.region },
          { label: "Type", value: entry.type },
          { label: "NPCs", value: entry.npcs?.join(", ") },
          { label: "Traders", value: entry.traders?.join(", ") },
          { label: "Fish", value: linkedList(entry.fish, fishHref) },
          { label: "Resources", value: linkedList(entry.resources, materialHref) },
          { label: "Quests", value: linkedList(entry.quests, questHref) },
        ]}
        related={[
          { label: "World Map", href: "/world/map/" },
          { label: "Creatures", href: "/world/creatures/" },
          { label: "Fishing Spots", href: "/fishing/fishing-spots/" },
        ]}
      />
    </div>
  );
}
