import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { baitHref, fish, locationHref } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Fish List – All 28 Fish Species, Baits & Locations",
  description:
    "Complete DREADMOOR fish list: all 28 species including Sea Blight mutants, with levels, habitats, bait, temperament and sell value per kilogram.",
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
        All {fish.length} fish species recorded in DREADMOOR, with level, temperament, habitat,
        effective bait and value per kilogram. Data is verified against the official October 2026
        demo build and will be re-checked against Early Access at launch. Search, filter and sort
        the ledger below.
      </p>
      <DbExplorer
        rows={fish.map((f) => ({
          id: f.slug,
          href: `/fishing/fish-list/${f.slug}/`,
          image: f.image,
          icon: "fish",
          iconTint: f.mutant ? "text-blood" : f.type === "Predatory" ? "text-copper-light" : "text-teal-light",
          cells: {
            name: f.name,
            level: f.level !== undefined ? `Lv ${f.level}` : "—",
            type: f.type ?? "—",
            mutation: f.mutant ? "Mutant" : "Standard",
            location: f.location ? { parts: [{ text: f.location, href: locationHref(f.location) ?? undefined }] } : "—",
            bait: f.bait
              ? {
                  parts: f.bait.split(" / ").map((name) => ({
                    text: name,
                    href: baitHref(name) ?? undefined,
                  })),
                }
              : "—",
            value: f.sellValue ?? "—",
          },
          filters: {
            type: f.type ? [f.type] : [],
            mutation: [f.mutant ? "Mutant" : "Standard"],
            bait: f.bait ? f.bait.split(" / ") : [],
            location: f.location ? [f.location] : [],
          },
        }))}
        columns={[
          { key: "name", label: "Species", sortable: true },
          { key: "level", label: "Level", sortable: true },
          { key: "type", label: "Type", sortable: true },
          { key: "mutation", label: "Mutation", sortable: true },
          { key: "location", label: "Habitat", sortable: true },
          { key: "bait", label: "Effective Bait" },
          { key: "value", label: "Value", sortable: true },
        ]}
        filters={[
          { key: "type", label: "Type" },
          { key: "mutation", label: "Mutation" },
          { key: "bait", label: "Bait" },
          { key: "location", label: "Habitat" },
        ]}
        searchPlaceholder="Search fish…"
      />
    </div>
  );
}
