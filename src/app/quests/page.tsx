import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { quests } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Quests & Walkthrough – Story Quests, Objectives & Rewards",
  description:
    "DREADMOOR quest guide: main story quests and side quests with objectives, prerequisites, NPC locations and rewards across the Submerged Lands.",
  path: "/quests/",
  image: "/images/quest-the-throat.webp",
});

export default function QuestsPage() {
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Quests", path: "/quests/" }])} />
      <Breadcrumbs items={[{ name: "Quests" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Quests &amp; Walkthrough</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="prose-dm">
          <p>
            DREADMOOR tells its story through the people and things that survived the flood. The
            main questline carries you from your first days at a rundown settlement out into the
            darker reaches of the Submerged Lands, while side quests from settlement{" "}
            <strong>NPCs</strong> send you hunting specific catches, salvaging materials and
            restoring what the Sea Blight has ruined.
          </p>
          <p>
            Quests are also the game&apos;s main way of teaching its systems: early story quests
            introduce fishing, repairs, engine upgrades and crafting, and their rewards fund your
            first real boat improvements. Our walkthrough pages list each quest&apos;s objectives,
            prerequisites, giver and location, and rewards, step by step.
          </p>
          <h2>What this section covers</h2>
          <ul>
            <li><strong>Main quests</strong> — the story line, objective by objective.</li>
            <li><strong>Side quests</strong> — NPC requests, fishing contracts and their rewards.</li>
            <li><strong>NPCs</strong> — who gives which quest and where to find them.</li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] h-fit overflow-hidden rounded-xl border border-teal/30">
          <Image src="/images/quest-the-throat.webp" alt="Night-time quest scene at the waterway gates in DREADMOOR" fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
        </div>
      </div>

      {quests.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quests.map((quest) => (
            <Link key={quest.slug} href={`/quests/${quest.slug}/`} className="card block p-5">
              <p className="eyebrow mb-1">{quest.type ?? "Quest"}</p>
              <h2 className="font-display text-lg font-bold text-ink">{quest.name}</h2>
              {quest.giver && <p className="mt-1 text-sm text-muted">From {quest.giver}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
