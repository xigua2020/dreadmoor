import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { fishingSpots, fishHref, locationHref } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Fishing Spots – Rare Fish Locations by Region",
  description:
    "DREADMOOR fishing spots guide: where to find each fish species across the Submerged Lands, including rare fish locations.",
  path: "/fishing/fishing-spots/",
});

export default function FishingSpotsPage() {
  if (!fishingSpots.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Fishing", path: "/fishing/" }, { name: "Fishing Spots", path: "/fishing/fishing-spots/" }])} />
      <Breadcrumbs items={[{ name: "Fishing", href: "/fishing/" }, { name: "Fishing Spots" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Fishing Spots</h1>
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        Verified fishing spots in DREADMOOR, the regions they belong to, and the species you can
        catch there.
      </p>
      <DbExplorer
        rows={fishingSpots.map((s) => ({
          id: s.slug,
          icon: "map",
          cells: {
            name: { parts: [{ text: s.name, href: locationHref(s.name) ?? undefined }] },
            region: s.region ?? "—",
            fish: s.fish?.length
              ? { parts: s.fish.map((name) => ({ text: name, href: fishHref(name) ?? undefined })) }
              : "—",
          },
          filters: {
            region: s.region ? [s.region] : [],
            fish: s.fish ?? [],
          },
        }))}
        columns={[
          { key: "name", label: "Spot", sortable: true },
          { key: "region", label: "Region", sortable: true },
          { key: "fish", label: "Fish" },
        ]}
        filters={[
          { key: "region", label: "Region" },
          { key: "fish", label: "Fish" },
        ]}
        searchPlaceholder="Search fishing spots…"
      />
    </div>
  );
}
