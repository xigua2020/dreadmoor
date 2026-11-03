import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbDetail from "@/components/DbDetail";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bySlug, locations } from "@/lib/data";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(locations, slug);
  if (!entry) return {};
  return buildMetadata({
    title: `${entry.name} – DREADMOOR Location`,
    description: entry.description ?? `${entry.name} in DREADMOOR: region, NPCs and resources.`,
    path: `/world/locations/${entry.slug}/`,
    image: entry.image,
  });
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
          { label: "Resources", value: entry.resources?.join(", ") },
        ]}
        related={[
          { label: "World Map", href: "/world/map/" },
          { label: "Creatures", href: "/world/creatures/" },
        ]}
      />
    </div>
  );
}
