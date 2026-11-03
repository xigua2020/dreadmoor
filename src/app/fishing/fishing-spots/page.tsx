import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbListing from "@/components/DbListing";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { fishingSpots } from "@/lib/data";

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
      <div className="mt-6">
        <DbListing
          title="Fishing spots database"
          intro="Verified fishing spots in DREADMOOR, the regions they belong to, and the species you can catch there."
          columns={["Spot", "Region", "Fish"]}
          rows={fishingSpots.map((s) => ({
            cells: [s.name, s.region ?? "—", s.fish?.join(", ") ?? "—"],
          }))}
        />
      </div>
    </div>
  );
}
