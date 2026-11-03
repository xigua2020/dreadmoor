import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbDetail from "@/components/DbDetail";
import JsonLd from "@/components/JsonLd";
import MaybeLink from "@/components/MaybeLink";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bySlug, characterHref, locationHref, materialHref, questHref, settlements } from "@/lib/data";

export function generateStaticParams() {
  return settlements.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(settlements, slug);
  if (!entry) return {};
  return buildMetadata({
    title: `${entry.name} – DREADMOOR Settlement`,
    description: entry.description?.slice(0, 155) ?? `${entry.name} in DREADMOOR.`,
    path: `/world/settlements/${entry.slug}/`,
    image: entry.image,
  });
}

function linked(names: string[] | undefined, resolve: (n: string) => string | null) {
  if (!names?.length) return undefined;
  return names.map((name, i) => (
    <span key={name}>{i > 0 && ", "}<MaybeLink href={resolve(name)}>{name}</MaybeLink></span>
  ));
}

export default async function SettlementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug(settlements, slug);
  if (!entry) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Settlements", path: "/world/settlements/" }, { name: entry.name, path: `/world/settlements/${entry.slug}/` }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Settlements", href: "/world/settlements/" }, { name: entry.name }]} />
      <h1 className="font-display mb-6 text-3xl font-bold text-ink">{entry.name}</h1>
      <DbDetail
        name={entry.name}
        description={entry.description}
        facts={[
          { label: "NPCs", value: linked(entry.npcs, characterHref) },
          { label: "Merchants", value: linked(entry.merchants, characterHref) },
          { label: "Services", value: entry.services?.join(", ") },
          { label: "Quests", value: linked(entry.quests, questHref) },
          { label: "Resources", value: linked(entry.resources, materialHref) },
          { label: "Locations", value: linked(entry.locations, locationHref) },
        ]}
        related={[
          { label: "Trading Guide", href: "/guides/trading-guide/" },
          { label: "Map & Locations Guide", href: "/guides/map-locations-guide/" },
          { label: "Characters", href: "/world/characters/" },
        ]}
      />
      {entry.image && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-teal/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={entry.image} alt={`${entry.name} settlement in DREADMOOR`} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
    </div>
  );
}
