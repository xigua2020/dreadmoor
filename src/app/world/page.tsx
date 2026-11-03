import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { creatures, locations } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR World Guide – Map, Locations, Creatures & the Sea Blight",
  description:
    "Explore DREADMOOR's Submerged Lands: world map, regions, settlements, traders, shipwrecks, caves, and the mutated creatures born of the Sea Blight.",
  path: "/world/",
  image: "/images/settlement-drydock.webp",
});

export default function WorldPage() {
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }])} />
      <Breadcrumbs items={[{ name: "World" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR World &amp; Locations Guide</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="prose-dm">
          <p>
            DREADMOOR is set in the <strong>Submerged Lands</strong> — a flooded, post-apocalyptic
            world where the remains of civilization poke out of dark water. From the helm of your
            trawler you chart courses between stilted settlements, half-drowned ruins, shipwrecks
            and caves, deciding how far from safety each trip will take you.
          </p>
          <p>
            The world is shaped by the <strong>Sea Blight</strong>, a corruption that twists both
            fish and flesh. It is responsible for the mutated creatures that prowl the waters and
            the abandoned buildings on land — and understanding where it festers is key to knowing
            which waters are worth the risk. Settlements offer traders, services and quests;
            beyond them, landmarks hold salvage, blueprints and rarer catches.
          </p>
          <h2>What this section covers</h2>
          <ul>
            <li><strong>Locations</strong> — settlements, traders, shipwrecks, caves and landmarks, region by region.</li>
            <li><strong>Creatures</strong> — the monsters of the Submerged Lands, their behavior and habitats.</li>
            <li><strong>Map</strong> — an overview of the world&apos;s regions as they are charted and verified.</li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] h-fit overflow-hidden rounded-xl border border-teal/30">
          <Image src="/images/cabin-red-beam.webp" alt="View from the trawler's wheelhouse toward a strange red beam over a flooded wreck field in DREADMOOR" fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link href={locations.length ? "/world/locations/" : "/world/"} className="card block p-5" aria-disabled={!locations.length}>
          <h2 className="font-display text-lg font-bold text-ink">Locations</h2>
          <p className="mt-1 text-sm text-muted">Settlements, traders and points of interest.</p>
          {locations.length > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{locations.length} entries</p>}
        </Link>
        <Link href={creatures.length ? "/world/creatures/" : "/world/"} className="card block p-5" aria-disabled={!creatures.length}>
          <h2 className="font-display text-lg font-bold text-ink">Creatures</h2>
          <p className="mt-1 text-sm text-muted">Mutated monsters, behavior and habitats.</p>
          {creatures.length > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{creatures.length} entries</p>}
        </Link>
        <Link href={locations.length ? "/world/map/" : "/world/"} className="card block p-5" aria-disabled={!locations.length}>
          <h2 className="font-display text-lg font-bold text-ink">World Map</h2>
          <p className="mt-1 text-sm text-muted">Regions and routes across the Submerged Lands.</p>
        </Link>
      </div>
    </div>
  );
}
