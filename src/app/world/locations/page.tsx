import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbListing from "@/components/DbListing";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { locations } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Locations – Settlements, Traders, Shipwrecks & Landmarks",
  description:
    "DREADMOOR locations database: settlements, traders, abandoned buildings, caves, shipwrecks and resource locations across the Submerged Lands.",
  path: "/world/locations/",
});

export default function LocationsPage() {
  if (!locations.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Locations", path: "/world/locations/" }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Locations" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Locations</h1>
      <div className="mt-6">
        <DbListing
          title="Locations database"
          intro="Verified locations in DREADMOOR: settlements, traders, ruins and resource spots, region by region."
          columns={["Location", "Region", "Type"]}
          rows={locations.map((l) => ({
            href: `/world/locations/${l.slug}/`,
            cells: [l.name, l.region ?? "—", l.type ?? "—"],
          }))}
        />
      </div>
    </div>
  );
}
