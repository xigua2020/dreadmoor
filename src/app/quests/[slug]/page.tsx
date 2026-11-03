import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bySlug, characterHref, locationHref, quests } from "@/lib/data";
import MaybeLink from "@/components/MaybeLink";

export function generateStaticParams() {
  return quests.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(quests, slug);
  if (!entry) return {};
  return buildMetadata({
    title: `${entry.name} – DREADMOOR Quest Walkthrough`,
    description: `${entry.name} quest walkthrough for DREADMOOR: objectives, prerequisites, location and rewards.`,
    path: `/quests/${entry.slug}/`,
    image: entry.image,
  });
}

export default async function QuestDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug(quests, slug);
  if (!entry) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Quests", path: "/quests/" }, { name: entry.name, path: `/quests/${entry.slug}/` }])} />
      <Breadcrumbs items={[{ name: "Quests", href: "/quests/" }, { name: entry.name }]} />
      <h1 className="font-display text-3xl font-bold text-ink">{entry.name}</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_320px]">
        <div className="prose-dm">
          {entry.objectives && entry.objectives.length > 0 && (
            <>
              <h2>Objectives</h2>
              <ol>
                {entry.objectives.map((objective, i) => <li key={i}>{objective}</li>)}
              </ol>
            </>
          )}
          {entry.walkthrough && (
            <>
              <h2>Walkthrough</h2>
              <p>{entry.walkthrough}</p>
            </>
          )}
        </div>
        <aside className="card h-fit p-5">
          <p className="eyebrow mb-3">Quest Info</p>
          <dl className="space-y-2.5 text-sm">
            {([
              ["Type", entry.type],
              ["Quest Giver", entry.giver ? <MaybeLink href={characterHref(entry.giver)}>{entry.giver}</MaybeLink> : undefined],
              ["Location", entry.location ? <MaybeLink href={locationHref(entry.location)}>{entry.location}</MaybeLink> : undefined],
              ["Prerequisites", entry.prerequisites?.join(", ")],
              ["Related Items", entry.items?.join(", ")],
              ["Rewards", entry.rewards?.join(", ")],
            ] as [string, React.ReactNode][]).filter(([, v]) => v).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-3 border-b border-teal/10 pb-2">
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
