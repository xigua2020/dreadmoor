import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ImageCard from "@/components/ImageCard";
import SearchBox from "@/components/SearchBox";
import VideoEmbed from "@/components/VideoEmbed";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import DbIcon from "@/components/DbIcon";
import { site } from "@/config/site";
import { getSearchIndex } from "@/lib/search-index";
import { getGuides } from "@/lib/guides";
import {
  bait, blueprints, boatUpgrades, creatures, fish, fishingSpots,
  locations, materials, quests, recipes,
} from "@/lib/data";

export const metadata: Metadata = {
  title: { absolute: "DREADMOOR Wiki & Guide – Fishing, Crafting & Boat Upgrades" },
  description:
    "Explore DREADMOOR Wiki and guides for fishing, fish locations, boat upgrades, crafting recipes, quests, maps, creatures, and survival in the Submerged Lands.",
  alternates: { canonical: site.url, languages: { en: site.url, "x-default": site.url } },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "DREADMOOR Wiki & Guide – Fishing, Crafting & Boat Upgrades",
    description: site.defaultDescription,
    url: site.url,
    images: [{ url: site.ogImage }],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "DREADMOOR Wiki & Guide – Fishing, Crafting & Boat Upgrades", description: site.defaultDescription, images: [site.ogImage] },
};

const START_CARDS = [
  {
    number: "1",
    title: "Beginner Guide",
    description: "Learn the essential controls, fishing basics, boat management, resource gathering, and survival mechanics.",
    href: "/guides/",
    image: "/images/swamp-dock-boat.webp",
    alt: "The fishing trawler docked at a swamp settlement in DREADMOOR",
  },
  {
    number: "2",
    title: "Fishing & Fish",
    description: "Discover fishing mechanics, fish species, bait, fishing spots, rare catches, and the Fishing Skill Tree.",
    href: "/fishing/",
    image: "/images/fishing-preview.avif",
    alt: "Fishing from the trawler in the flooded world of DREADMOOR",
  },
  {
    number: "3",
    title: "Boat Upgrades",
    description: "Learn how to upgrade your trawler, improve its engine and hull, manage fuel, and prepare for dangerous expeditions.",
    href: "/boat/",
    image: "/images/engine-install.webp",
    alt: "Installing an upgraded engine module on the trawler in DREADMOOR",
  },
  {
    number: "4",
    title: "Crafting & Survival",
    description: "Find useful resources, discover blueprints, unlock crafting recipes, and create equipment for survival.",
    href: "/crafting/",
    image: "/images/bunkhouse-repair.webp",
    alt: "Patching a hole in the bunkhouse wall with salvaged planks in DREADMOOR",
  },
];

const SYSTEMS = [
  { title: "Fishing & Fish", href: "/fishing/", image: "/images/fishing-preview.avif", alt: "Fishing in DREADMOOR", description: "Fish species, mutations, bait and the best fishing spots across the Submerged Lands." },
  { title: "Boat & Upgrades", href: "/boat/", image: "/images/engineer-workshop.webp", alt: "The Engineer at a dry dock workshop in DREADMOOR", description: "Engine, hull, spotlight and equipment upgrades for your trawler." },
  { title: "Crafting & Equipment", href: "/crafting/", image: "/images/bunkhouse-repair.webp", alt: "Crafting repairs in DREADMOOR", description: "Recipes, blueprints and materials for survival gear and specialized bait." },
  { title: "World & Locations", href: "/world/", image: "/images/settlement-drydock.webp", alt: "A settlement with a dry dock in the Submerged Lands of DREADMOOR", description: "Settlements, traders, shipwrecks and landmarks of the flooded world." },
  { title: "Survival & Combat", href: "/survival/", image: "/images/cave-combat.png", alt: "Facing a mutated creature in a dark cave in DREADMOOR", description: "Weapons, combat mechanics and how to survive the Sea Blight." },
  { title: "Quests & Story", href: "/quests/", image: "/images/quest-the-throat.webp", alt: "The quest to open the Gates of the Throat in DREADMOOR", description: "Main quests, side quests, NPCs and walkthrough support." },
];

export default function HomePage() {
  const guides = getGuides();
  const databases = [
    { title: "Fish Database", icon: "fish", count: fish.length, href: fish.length ? "/fishing/fish-list/" : "/fishing/", description: "Species, mutations, locations, bait and sell values." },
    { title: "Bait", icon: "bait", count: bait.length, href: bait.length ? "/fishing/bait/" : "/fishing/", description: "Bait and lures, and which fish they attract." },
    { title: "Fishing Spots", icon: "map", count: fishingSpots.length, href: fishingSpots.length ? "/fishing/fishing-spots/" : "/fishing/", description: "Where to find each species across the regions." },
    { title: "Boat Upgrades", icon: "boat", count: boatUpgrades.length, href: boatUpgrades.length ? "/boat/upgrades/" : "/boat/", description: "Engine, hull, propeller, spotlight and more." },
    { title: "Crafting Recipes", icon: "recipe", count: recipes.length, href: recipes.length ? "/crafting/recipes/" : "/crafting/", description: "Ingredients, quantities and crafting requirements." },
    { title: "Blueprints", icon: "blueprint", count: blueprints.length, href: blueprints.length ? "/crafting/blueprints/" : "/crafting/", description: "Where to find blueprints and what they unlock." },
    { title: "Resources", icon: "material", count: materials.length, href: materials.length ? "/world/resources/" : "/world/", description: "Scrap metal, salvage and where to gather them." },
    { title: "Creatures", icon: "creature", count: creatures.length, href: creatures.length ? "/world/creatures/" : "/world/", description: "Mutated creatures, behavior and combat notes." },
    { title: "Locations", icon: "location", count: locations.length, href: locations.length ? "/world/locations/" : "/world/", description: "Settlements, traders, caves and shipwrecks." },
    { title: "Quests", icon: "quest", count: quests.length, href: quests.length ? "/quests/" : "/quests/", description: "Objectives, prerequisites and rewards." },
  ];
  const hasUpdates = guides.length > 0;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          description: site.defaultDescription,
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search/?q={search_term_string}` },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "DREADMOOR",
          url: site.steamUrl,
          gamePlatform: "PC",
          applicationCategory: "Game",
          genre: ["Fishing", "Adventure", "Survival", "Horror"],
          author: { "@type": "Organization", name: "Dream Dock" },
          publisher: { "@type": "Organization", name: "Digital Vortex Entertainment" },
        }}
      />

      {/* 1. Hero */}
      <section className="relative -mx-4 mb-14 overflow-hidden">
        <div className="relative h-[420px] w-full md:h-[520px]">
          <Image
            src="/images/hero-trawler-tentacle.webp"
            alt="A fishing trawler facing a giant tentacled sea monster in DREADMOOR key art"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/45 to-abyss/15" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-6xl px-4 pb-12">
              <p className="eyebrow mb-3">Fan-Made Community Wiki</p>
              <h1 className="font-display text-4xl font-black tracking-wide text-ink drop-shadow md:text-6xl">
                DREAD<span className="text-copper-light">MOOR</span> <span className="text-teal-light">Wiki</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-ink/90 md:text-lg">
                Explore the flooded Submerged Lands, catch rare fish, upgrade your trawler, craft
                survival gear, and face dangerous creatures across land and water. Use our guides to
                learn the fishing, boat, crafting, and exploration systems.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/guides/" className="btn btn-primary">Start Beginner Guide</Link>
                <Link href="/fishing/" className="btn btn-outline">Explore Fishing Guides</Link>
                <Link href="/boat/" className="btn btn-copper">Browse Boat Upgrades</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Wiki Search */}
      <section className="mb-14">
        <h2 className="sr-only">Wiki Search</h2>
        <SearchBox items={getSearchIndex()} />
      </section>

      {/* 3. Start Here */}
      <section className="mb-14">
        <p className="eyebrow mb-2">Start Here</p>
        <h2 className="section-title mb-6">Your DREADMOOR Journey</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {START_CARDS.map((card) => (
            <div key={card.number} className="relative">
              <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-copper font-display text-sm font-bold text-ink shadow">
                {card.number}
              </span>
              <ImageCard href={card.href} image={card.image} alt={card.alt} title={card.title} description={card.description} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Explore Game Systems */}
      <section className="mb-14">
        <p className="eyebrow mb-2">Explore Game Systems</p>
        <h2 className="section-title mb-6">Master the Submerged Lands</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SYSTEMS.map((system) => (
            <ImageCard key={system.href} href={system.href} image={system.image} alt={system.alt} title={system.title} description={system.description} />
          ))}
        </div>
      </section>

      <AdSlot id="home-mid" className="mb-14" />

      {/* 5. Popular Guides — rendered only when verified guides exist */}
      {guides.length > 0 && (
        <section className="mb-14">
          <p className="eyebrow mb-2">Popular Guides</p>
          <h2 className="section-title mb-6">Most-Read DREADMOOR Guides</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.slice(0, 6).map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}/`} className="card block p-5">
                <p className="eyebrow mb-1">{guide.category}</p>
                <h3 className="font-display text-lg font-bold text-ink">{guide.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 6. Wiki Databases */}
      <section className="mb-14">
        <p className="eyebrow mb-2">Wiki Databases</p>
        <h2 className="section-title mb-6">DREADMOOR Game Databases</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {databases.map((db) => (
            <Link key={db.title} href={db.href} className="card block p-4">
              <span className="mb-2 inline-flex rounded-lg bg-teal/15 p-2 text-teal-light">
                <DbIcon name={db.icon} />
              </span>
              <h3 className="font-semibold text-ink">{db.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted">{db.description}</p>
              {db.count > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{db.count} entries</p>}
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Featured Gameplay Video */}
      <section className="mb-14">
        <p className="eyebrow mb-2">Featured Video</p>
        <h2 className="section-title mb-6">DREADMOOR Gameplay</h2>
        <div className="mx-auto max-w-3xl">
          <VideoEmbed videoId={site.featuredVideoId} title="DREADMOOR gameplay video" />
        </div>
      </section>

      {/* 8. Recently Updated — rendered only when there is dated content */}
      {hasUpdates && (
        <section className="mb-14">
          <p className="eyebrow mb-2">Recently Updated</p>
          <h2 className="section-title mb-6">Latest Wiki Updates</h2>
          <ul className="divide-y divide-teal/10 rounded-lg border border-teal/30 bg-surface">
            {guides.slice(0, 5).map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}/`} className="flex items-center justify-between px-4 py-3 hover:bg-elevated">
                  <span className="font-medium text-ink">{guide.title}</span>
                  <span className="text-xs text-muted">{guide.updated}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 9. About DREADMOOR */}
      <section className="mb-14 grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="eyebrow mb-2">About DREADMOOR</p>
          <h2 className="section-title mb-4">What is DREADMOOR?</h2>
          <p className="leading-7 text-muted">
            DREADMOOR is a dark first-person fishing adventure set in a flooded post-apocalyptic
            world. Players captain a fishing trawler, explore submerged locations, catch fish,
            salvage resources, and trade their finds.
          </p>
          <p className="mt-3 leading-7 text-muted">
            Fishing, boat progression, crafting, and real-time combat form the core gameplay loop.
            Discover different fish species and mutations, create specialized gear, upgrade your
            vessel, and face hostile creatures across land and water.
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {[
              ["Developer", "Dream Dock"],
              ["Publisher", "Digital Vortex Entertainment"],
              ["Platform", "Windows PC / Steam"],
              ["Genre", "Fishing Adventure, Survival, Horror"],
              ["Perspective", "First-Person"],
              ["Game Mode", "Single-player"],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-teal/10 pb-2">
                <dt className="text-muted">{label}</dt>
                <dd className="font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/guides/" className="btn btn-outline mt-6">Explore All Guides</Link>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-teal/30">
          <Image
            src="/images/art-monster-trawler.jpg"
            alt="DREADMOOR artwork of a trawler before a colossal glowing-eyed deep-sea entity"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="card relative overflow-hidden p-10 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/15 via-transparent to-copper/10" />
        <h2 className="section-title relative">Ready to Explore DREADMOOR?</h2>
        <p className="relative mx-auto mt-3 max-w-xl leading-7 text-muted">
          From your first fishing trip to your most dangerous expedition, find the guides,
          resources, and knowledge you need to survive the Submerged Lands.
        </p>
        <div className="relative mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/guides/" className="btn btn-primary">Read the Beginner Guide</Link>
          <a href={site.steamUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Play on Steam
          </a>
        </div>
      </section>
    </>
  );
}
