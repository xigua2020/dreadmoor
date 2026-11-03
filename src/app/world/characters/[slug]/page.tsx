import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbDetail from "@/components/DbDetail";
import JsonLd from "@/components/JsonLd";
import MaybeLink from "@/components/MaybeLink";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bySlug, characters, locationHref, questHref } from "@/lib/data";

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(characters, slug);
  if (!entry) return {};
  return buildMetadata({
    title: `${entry.name} – DREADMOOR Character`,
    description: entry.description?.slice(0, 155) ?? `${entry.name} in DREADMOOR.`,
    path: `/world/characters/${entry.slug}/`,
    image: entry.image,
  });
}

export default async function CharacterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug(characters, slug);
  if (!entry) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Characters", path: "/world/characters/" }, { name: entry.name, path: `/world/characters/${entry.slug}/` }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Characters", href: "/world/characters/" }, { name: entry.name }]} />
      <h1 className="font-display mb-6 text-3xl font-bold text-ink">{entry.name}</h1>
      <DbDetail
        name={entry.name}
        image={entry.image}
        description={entry.description}
        facts={[
          { label: "Role", value: entry.role },
          { label: "Location", value: entry.location ? <MaybeLink href={locationHref(entry.location)}>{entry.location}</MaybeLink> : undefined },
          {
            label: "Quests",
            value: entry.quests?.map((name, i) => (
              <span key={name}>{i > 0 && ", "}<MaybeLink href={questHref(name)}>{name}</MaybeLink></span>
            )),
          },
          { label: "Services", value: entry.services?.join(", ") },
        ]}
        related={[
          { label: "NPC Guide", href: "/guides/npc-guide/" },
          { label: "Quests", href: "/quests/" },
          { label: "Locations", href: "/world/locations/" },
        ]}
      />
    </div>
  );
}
