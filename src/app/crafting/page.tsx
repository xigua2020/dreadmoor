import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { blueprints, materials, recipes } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Crafting Guide – Recipes, Blueprints & Materials",
  description:
    "DREADMOOR crafting guide: crafting recipes, blueprint locations, scrap metal and material farming, and how to craft bait, harpoons, medicine and survival tools.",
  path: "/crafting/",
  image: "/images/bunkhouse-repair.webp",
});

export default function CraftingPage() {
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Crafting", path: "/crafting/" }])} />
      <Breadcrumbs items={[{ name: "Crafting" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Crafting &amp; Equipment Guide</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="prose-dm">
          <p>
            Surviving the Submerged Lands means making do with what the flood left behind.
            DREADMOOR&apos;s crafting system turns salvaged <strong>scrap metal</strong>, fibers
            and stranger ingredients into the tools of the trade: specialized bait for rare fish,
            <strong> harpoons</strong> and weapons for self-defense, medicine to treat the Sea
            Blight&apos;s effects, and repair materials for your bunkhouse and boat.
          </p>
          <p>
            New recipes are unlocked through <strong>blueprints</strong> found while exploring
            abandoned buildings, shipwrecks and settlements, so crafting progression naturally
            pushes you out into the world. Our database lists each recipe&apos;s ingredients and
            quantities, the crafting stations or requirements involved, and what the finished item
            does.
          </p>
          <h2>What this section covers</h2>
          <ul>
            <li><strong>Crafting recipes</strong> — ingredients, quantities and requirements for every verified recipe.</li>
            <li><strong>Blueprints</strong> — where to find them and what each one unlocks.</li>
            <li><strong>Materials</strong> — scrap metal and other resources, with gathering locations.</li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] h-fit overflow-hidden rounded-xl border border-teal/30">
          <Image src="/images/engineer-workshop.webp" alt="The Engineer's workshop at a settlement in DREADMOOR, with tools and materials on the workbench" fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link href={recipes.length ? "/crafting/recipes/" : "/crafting/"} className="card block p-5" aria-disabled={!recipes.length}>
          <h2 className="font-display text-lg font-bold text-ink">Recipes</h2>
          <p className="mt-1 text-sm text-muted">Ingredients, quantities and effects.</p>
          {recipes.length > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{recipes.length} entries</p>}
        </Link>
        <Link href={blueprints.length ? "/crafting/blueprints/" : "/crafting/"} className="card block p-5" aria-disabled={!blueprints.length}>
          <h2 className="font-display text-lg font-bold text-ink">Blueprints</h2>
          <p className="mt-1 text-sm text-muted">Blueprint locations and unlocks.</p>
          {blueprints.length > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{blueprints.length} entries</p>}
        </Link>
        <Link href={materials.length ? "/world/resources/" : "/world/"} className="card block p-5" aria-disabled={!materials.length}>
          <h2 className="font-display text-lg font-bold text-ink">Resources</h2>
          <p className="mt-1 text-sm text-muted">Where to gather each crafting material.</p>
          {materials.length > 0 && <p className="mt-2 text-xs font-semibold text-teal-light">{materials.length} entries</p>}
        </Link>
      </div>
    </div>
  );
}
