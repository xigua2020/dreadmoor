import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbListing from "@/components/DbListing";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { fish } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Fish List – All Fish Species, Mutations & Locations",
  description:
    "Complete DREADMOOR fish list: every fish species and mutation with locations, bait, rarity and sell value, verified in-game.",
  path: "/fishing/fish-list/",
});

export default function FishListPage() {
  if (!fish.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Fishing", path: "/fishing/" }, { name: "Fish List", path: "/fishing/fish-list/" }])} />
      <Breadcrumbs items={[{ name: "Fishing", href: "/fishing/" }, { name: "Fish List" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Fish List</h1>
      <div className="mt-6">
        <DbListing
          title="Fish database"
          intro="Every fish species verified in DREADMOOR, including mutations, with where to catch them, which bait to use, and what they sell for."
          columns={["Name", "Type", "Location", "Bait", "Rarity", "Sell Value"]}
          rows={fish.map((f) => ({
            href: `/fishing/fish-list/${f.slug}/`,
            cells: [f.name, f.type ?? "—", f.location ?? "—", f.bait ?? "—", f.rarity ?? "—", f.sellValue ?? "—"],
          }))}
        />
      </div>
    </div>
  );
}
