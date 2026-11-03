import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { boatUpgrades } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Boat Upgrades Guide – Engine, Hull, Fuel & Repairs",
  description:
    "DREADMOOR boat guide: trawler upgrades for engine, propeller, hull and spotlight, plus fuel management, dry dock services and hull repair explained.",
  path: "/boat/",
  image: "/images/engine-install.webp",
});

export default function BoatPage() {
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Boat", path: "/boat/" }])} />
      <Breadcrumbs items={[{ name: "Boat" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Boat &amp; Upgrades Guide</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="prose-dm">
          <p>
            Your trawler is more than transport in DREADMOOR — it is your home, your workshop and
            your lifeline in the Submerged Lands. Every expedition starts and ends at its helm, and
            how far you can push into blighted waters depends on how well you maintain and upgrade
            the boat.
          </p>
          <p>
            Boat progression revolves around modular upgrades installed at the{" "}
            <strong>dry dock</strong>: a stronger <strong>engine</strong> and{" "}
            <strong>propeller</strong> for speed, a reinforced <strong>hull</strong> to survive
            collisions and creature attacks, and equipment like the <strong>spotlight</strong> for
            work after dark. Upgrades cost money and salvaged materials, which ties the boat
            directly into fishing and exploration.
          </p>
          <h2>What this section covers</h2>
          <ul>
            <li><strong>Boat upgrades</strong> — every upgrade component, its effect, materials and cost.</li>
            <li><strong>Repairs</strong> — how hull damage works and how to repair your trawler.</li>
            <li><strong>Fuel</strong> — consumption, refueling and planning longer expeditions.</li>
            <li><strong>Dry dock</strong> — where to install modules and which services each dock offers.</li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] h-fit overflow-hidden rounded-xl border border-teal/30">
          <Image src="/images/engine-install.webp" alt="Installing an upgraded engine module into the trawler's ship module slot in DREADMOOR" fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href={boatUpgrades.length ? "/boat/upgrades/" : "/boat/"} className="card block p-5" aria-disabled={!boatUpgrades.length}>
          <h2 className="font-display text-lg font-bold text-ink">Boat Upgrades Database</h2>
          <p className="mt-1 text-sm text-muted">Components, levels, materials, costs and effects.</p>
          {boatUpgrades.length > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{boatUpgrades.length} entries</p>}
        </Link>
        <Link href="/crafting/" className="card block p-5">
          <h2 className="font-display text-lg font-bold text-ink">Upgrade Materials</h2>
          <p className="mt-1 text-sm text-muted">Where to salvage scrap metal and crafting materials for boat work.</p>
        </Link>
      </div>
    </div>
  );
}
