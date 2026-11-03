import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bait, fish, fishingSpots } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Fishing Guide – Fish List, Bait & Fishing Spots",
  description:
    "DREADMOOR fishing guide: learn fishing mechanics, browse the fish list with species and mutations, choose the right bait, and find the best fishing spots.",
  path: "/fishing/",
  image: "/images/fishing-preview.avif",
});

export default function FishingPage() {
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Fishing", path: "/fishing/" }])} />
      <Breadcrumbs items={[{ name: "Fishing" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Fishing Guide</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="prose-dm">
          <p>
            Fishing is the beating heart of DREADMOOR. Your catch is your income, your crafting
            supply and — in the blighted corners of the Submerged Lands — sometimes your problem.
            From the deck of your trawler you cast into flooded ruins and open water, hauling in
            everything from ordinary species to twisted <strong>fish mutations</strong> warped by
            the Sea Blight.
          </p>
          <p>
            The fishing system ties into everything else in the game: the fish you catch can be
            sold to traders, processed into materials, and used to fund boat upgrades and better
            equipment. Different species favor different <strong>bait</strong> and different{" "}
            <strong>fishing spots</strong>, so learning where and how to fish each region is the
            fastest way to progress.
          </p>
          <h2>What this section covers</h2>
          <ul>
            <li><strong>Fish list</strong> — every species we have verified, with type, location, bait, rarity and sell value.</li>
            <li><strong>Bait &amp; lures</strong> — what each bait attracts and how to get it, including specialized bait.</li>
            <li><strong>Fishing spots</strong> — where to find rare fish across the regions of the Submerged Lands.</li>
            <li><strong>Fishing mechanics</strong> — casting, reeling and the fishing skill progression.</li>
          </ul>
          <p>
            Database entries are added as they are verified in-game, so check back as the wiki
            grows.
          </p>
        </div>
        <div className="relative aspect-[4/3] h-fit overflow-hidden rounded-xl border border-teal/30">
          <Image src="/images/swamp-dock-boat.webp" alt="The trawler moored beside a stilted settlement, ready for a fishing trip in DREADMOOR" fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link href={fish.length ? "/fishing/fish-list/" : "/fishing/"} className="card block p-5" aria-disabled={!fish.length}>
          <h2 className="font-display text-lg font-bold text-ink">Fish List</h2>
          <p className="mt-1 text-sm text-muted">Species, mutations, locations, bait, rarity and value.</p>
          {fish.length > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{fish.length} entries</p>}
        </Link>
        <Link href={bait.length ? "/fishing/bait/" : "/fishing/"} className="card block p-5" aria-disabled={!bait.length}>
          <h2 className="font-display text-lg font-bold text-ink">Bait &amp; Lures</h2>
          <p className="mt-1 text-sm text-muted">What each bait attracts and where to get it.</p>
          {bait.length > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{bait.length} entries</p>}
        </Link>
        <Link href={fishingSpots.length ? "/fishing/fishing-spots/" : "/fishing/"} className="card block p-5" aria-disabled={!fishingSpots.length}>
          <h2 className="font-display text-lg font-bold text-ink">Fishing Spots</h2>
          <p className="mt-1 text-sm text-muted">The best spots for each species, region by region.</p>
          {fishingSpots.length > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{fishingSpots.length} entries</p>}
        </Link>
      </div>
    </div>
  );
}
