import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbDetail from "@/components/DbDetail";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bySlug, creatures, locationHref } from "@/lib/data";
import MaybeLink from "@/components/MaybeLink";

export function generateStaticParams() {
  return creatures.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(creatures, slug);
  if (!entry) return {};
  return buildMetadata({
    title: `${entry.name} – DREADMOOR Creature`,
    description: entry.description ?? `${entry.name} in DREADMOOR: location, behavior and combat notes.`,
    path: `/world/creatures/${entry.slug}/`,
    image: entry.image,
  });
}

export default async function CreatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug(creatures, slug);
  if (!entry) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Creatures", path: "/world/creatures/" }, { name: entry.name, path: `/world/creatures/${entry.slug}/` }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Creatures", href: "/world/creatures/" }, { name: entry.name }]} />
      <h1 className="font-display mb-6 text-3xl font-bold text-ink">{entry.name}</h1>
      <DbDetail
        name={entry.name}
        image={entry.image}
        description={entry.description}
        facts={[
          { label: "Type", value: entry.type },
          { label: "Location", value: entry.location ? <MaybeLink href={locationHref(entry.location)}>{entry.location}</MaybeLink> : undefined },
          { label: "Behavior", value: entry.behavior },
          { label: "Weakness", value: entry.weakness },
        ]}
        related={[
          { label: "Combat Guide", href: "/guides/combat-guide/" },
          { label: "Survival Guide", href: "/guides/survival-guide/" },
          { label: "Locations", href: "/world/locations/" },
        ]}
      />
    </div>
  );
}
