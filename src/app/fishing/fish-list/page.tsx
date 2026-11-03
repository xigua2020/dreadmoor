import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { baitHref, fish, locationHref } from "@/lib/data";

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
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        Every fish species verified in DREADMOOR, including mutations, with where to catch them,
        which bait to use, and what they sell for. Search, filter and sort the table below.
      </p>
      <DbExplorer
        rows={fish.map((f) => ({
          id: f.slug,
          href: `/fishing/fish-list/${f.slug}/`,
          cells: {
            name: f.name,
            type: f.type ?? "—",
            location: f.location ? { parts: [{ text: f.location, href: locationHref(f.location) ?? undefined }] } : "—",
            bait: f.bait ? { parts: [{ text: f.bait, href: baitHref(f.bait) ?? undefined }] } : "—",
            rarity: f.rarity ?? "—",
            value: f.sellValue ?? "—",
          },
          filters: {
            type: f.type ? [f.type] : [],
            rarity: f.rarity ? [f.rarity] : [],
            bait: f.bait ? [f.bait] : [],
            location: f.location ? [f.location] : [],
          },
        }))}
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "type", label: "Type", sortable: true },
          { key: "location", label: "Location", sortable: true },
          { key: "bait", label: "Bait", sortable: true },
          { key: "rarity", label: "Rarity", sortable: true },
          { key: "value", label: "Sell Value", sortable: true },
        ]}
        filters={[
          { key: "type", label: "Type" },
          { key: "rarity", label: "Rarity" },
          { key: "bait", label: "Bait" },
          { key: "location", label: "Location" },
        ]}
        searchPlaceholder="Search fish…"
      />
    </div>
  );
}
