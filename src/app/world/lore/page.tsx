import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Lore – Submerged Lands & Sea Blight",
  description:
    "DREADMOOR lore: the flooded world of the Submerged Lands, the Sea Blight catastrophe, Malcolm's story, and the people and creatures who survived the flood.",
  path: "/world/lore/",
});

export default function LorePage() {
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Lore", path: "/world/lore/" }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Lore" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Lore &amp; World Background</h1>
      <p className="mt-3 max-w-3xl leading-7 text-muted">
        What is known about DREADMOOR&apos;s world, drawn from the official game and in-game
        evidence. This page is intentionally conservative — it records what the game shows, not
        speculation. Verified against the official October 2026 demo build.
      </p>

      <div className="relative mt-6 aspect-[16/7] overflow-hidden rounded-xl border border-teal/30">
        <Image src="/images/art-monster-trawler.jpg" alt="DREADMOOR artwork of the trawler facing a colossal deep-sea entity in the Submerged Lands" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
      </div>

      <div className="prose-dm mt-8 max-w-3xl">
        <h2>The Submerged Lands</h2>
        <p>
          DREADMOOR takes place in the <strong>Submerged Lands</strong>, a flooded post-apocalyptic
          world where the remains of civilization poke out of dark water. Settlements stand on
          stilts and wreckage, travel happens by boat, and the flood is recent enough that people
          still remember dry ground. The developers describe a dark first-person fishing adventure
          inspired by the likes of DREDGE — Lovecraftian in tone, built on fog, silence and
          distance.
        </p>
        <h2>The Sea Blight</h2>
        <p>
          The <strong>Sea Blight</strong> is the world&apos;s corruption. It twists fish into{" "}
          <Link href="/fishing/fish-list/">mutant variants</Link>, fouls whole stretches of water
          into dangerous <Link href="/world/locations/blight-line/">blighted zones</Link>, and wears
          down the people who live in it. At the Trading Post,{" "}
          <Link href="/world/characters/gill/">Gill</Link> and{" "}
          <Link href="/world/characters/bozur/">Bozur</Link> administer an{" "}
          <strong>Essence</strong> treatment that suppresses its effects — recorded not as charity
          but as a debt, which is how Malcolm&apos;s story begins. Read the full breakdown in the{" "}
          <Link href="/world/sea-blight/">Sea Blight reference</Link>.
        </p>
        <h2>Malcolm</h2>
        <p>
          The player character is <Link href="/world/characters/malcolm/">Malcolm</Link>, a
          weathered fisherman with a past he does not explain. The demo opens with voices from his
          life before the flood and leaves most of his history to the world and the journal. He is
          voiced in first person, and the game shows his hands and tools rather than an avatar —
          the perspective is the story.
        </p>
        <h2>The People Who Stayed</h2>
        <p>
          What remains of society clusters around trade. <strong>Gill and Bozur</strong> run{" "}
          <Link href="/world/locations/betsy-and-sons/">Betsy and Sons</Link>, the trading post
          carried on the back of <Link href="/world/creatures/betsy/">Betsy</Link>, a giant crab —
          the shop is literally alive. <strong>John the Fifth</strong>, the engineer of the{" "}
          <Link href="/world/locations/dry-dock/">Dry Dock</Link>, keeps the boats running and his
          Moonshine Still almost running. Their debts, contracts and repairs form the spine of the
          story told so far.
        </p>
        <h2>What Lurks in the Water</h2>
        <p>
          Official art and in-game encounters agree on one thing: the flood did not empty the
          water. Giant tentacles strike boats at night, ghouls walk the drowned ruins, and
          something colossal watches from the deep in the game&apos;s key art. The known and
          confirmed entries are catalogued in the{" "}
          <Link href="/world/creatures/">creatures database</Link>.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link href="/world/sea-blight/" className="card block p-5">
          <h2 className="font-display text-lg font-bold text-ink">The Sea Blight</h2>
          <p className="mt-1 text-sm text-muted">Mutations, blighted areas and survival methods.</p>
        </Link>
        <Link href="/world/characters/" className="card block p-5">
          <h2 className="font-display text-lg font-bold text-ink">Characters</h2>
          <p className="mt-1 text-sm text-muted">Malcolm, the traders, the engineer and the crab.</p>
        </Link>
        <Link href="/world/locations/" className="card block p-5">
          <h2 className="font-display text-lg font-bold text-ink">Locations</h2>
          <p className="mt-1 text-sm text-muted">Every verified place in the Submerged Lands.</p>
        </Link>
      </div>
    </div>
  );
}
