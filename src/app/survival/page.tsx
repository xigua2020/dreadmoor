import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { creatures } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Survival Guide – Combat & Night",
  description:
    "DREADMOOR survival guide: combat mechanics, weapons and harpoons, dealing with mutated creatures, and how to survive the dangers of the Submerged Lands.",
  path: "/survival/",
  image: "/images/night-fish-monster.webp",
});

export default function SurvivalPage() {
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Survival", path: "/survival/" }])} />
      <Breadcrumbs items={[{ name: "Survival" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Survival &amp; Combat Guide</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="prose-dm">
          <p>
            The Submerged Lands do not want you in them. DREADMOOR mixes its fishing and crafting
            loop with real danger: mutated <strong>creatures</strong> on land and in the water, and
            the creeping influence of the Sea Blight. Survival is about preparation — the right
            gear, a seaworthy trawler, and knowing when a fight is not worth taking.
          </p>
          <p>
            <strong>Combat</strong> in DREADMOOR plays out in first person with weapons you craft
            and maintain, from harpoons to heavier tools for close encounters. Different creatures
            behave differently: some ambush, some pursue, and some are best avoided entirely.
            Learning each monster&apos;s behavior is as valuable as any weapon upgrade.
          </p>
          <h2>What this section covers</h2>
          <ul>
            <li><strong>Combat mechanics</strong> — weapons, aiming, and how encounters work.</li>
            <li><strong>Creature strategies</strong> — behavior notes and how to deal with each threat.</li>
            <li><strong>Survival systems</strong> — health, medicine, and managing risk at night and in blighted zones.</li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] h-fit overflow-hidden rounded-xl border border-teal/30">
          <Image src="/images/night-fish-monster.webp" alt="A huge mutated fish creature lunging at the trawler during the night in DREADMOOR" fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href={creatures.length ? "/world/creatures/" : "/world/"} className="card block p-5">
          <h2 className="font-display text-lg font-bold text-ink">Creature Database</h2>
          <p className="mt-1 text-sm text-muted">Know your enemy: types, locations and behavior.</p>
          {creatures.length > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{creatures.length} entries</p>}
        </Link>
        <Link href="/crafting/" className="card block p-5">
          <h2 className="font-display text-lg font-bold text-ink">Survival Gear &amp; Medicine</h2>
          <p className="mt-1 text-sm text-muted">Craft the weapons, tools and medicine you need to stay alive.</p>
        </Link>
      </div>
    </div>
  );
}
