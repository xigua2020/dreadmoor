import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getGuides } from "@/lib/guides";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Guides – Beginner Guide, Controls, Tips & Walkthroughs",
  description:
    "All DREADMOOR guides in one place: beginner guide, controls, fishing tips, boat management, crafting and story walkthroughs for the Submerged Lands.",
  path: "/guides/",
});

export default function GuidesPage() {
  const guides = getGuides();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }])} />
      <Breadcrumbs items={[{ name: "Guides" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Guides</h1>
      <div className="prose-dm mt-4 max-w-3xl">
        <p>
          This DREADMOOR guide hub collects our walkthroughs and system guides for the dark
          first-person fishing adventure from Dream Dock. Whether you are setting out on your first
          trip into the Submerged Lands or preparing a long expedition into blighted waters, start
          here.
        </p>
        <p>
          DREADMOOR&apos;s core loop ties four systems together: you <strong>fish</strong> to earn
          your keep, <strong>upgrade your trawler</strong> to reach more dangerous and rewarding
          waters, <strong>craft</strong> gear and specialized bait from salvaged materials, and{" "}
          <strong>fight or avoid</strong> the mutated creatures that stalk land and water. Our
          guides follow the same structure, so you can always find the system you need:
        </p>
        <ul>
          <li><Link href="/fishing/">Fishing &amp; Fish</Link> — species, mutations, bait and fishing spots.</li>
          <li><Link href="/boat/">Boat &amp; Upgrades</Link> — engines, hulls, equipment and repairs at the dry dock.</li>
          <li><Link href="/crafting/">Crafting &amp; Equipment</Link> — recipes, blueprints and survival materials.</li>
          <li><Link href="/world/">World &amp; Locations</Link> — settlements, traders and points of interest.</li>
          <li><Link href="/survival/">Survival &amp; Combat</Link> — weapons, creatures and staying alive at night.</li>
          <li><Link href="/quests/">Quests &amp; Story</Link> — objectives, NPCs and walkthrough support.</li>
        </ul>
        <p>
          New here? The beginner guide, controls reference and essential tips below are the best
          first reads. Articles are published as they are verified against the released game.
        </p>
      </div>

      {guides.length > 0 && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}/`} className="card block p-5">
              <p className="eyebrow mb-1">{guide.category}</p>
              <h2 className="font-display text-lg font-bold text-ink">{guide.title}</h2>
              <p className="mt-1.5 text-sm leading-6 text-muted">{guide.description}</p>
              <p className="mt-3 text-xs text-muted">Updated {guide.updated}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
