import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
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
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        Verified locations in DREADMOOR: settlements, traders, ruins and resource spots, region by
        region.
      </p>
      <DbExplorer
        rows={locations.map((l) => ({
          id: l.slug,
          href: `/world/locations/${l.slug}/`,
          icon: "location",
          iconTint: l.type === "Danger" ? "text-blood" : l.type === "Fishing" ? "text-teal-light" : undefined,
          cells: {
            name: l.name,
            region: l.region ?? "—",
            type: l.type ?? "—",
          },
          filters: {
            region: l.region ? [l.region] : [],
            type: l.type ? [l.type] : [],
          },
        }))}
        columns={[
          { key: "name", label: "Location", sortable: true },
          { key: "region", label: "Region", sortable: true },
          { key: "type", label: "Type", sortable: true },
        ]}
        filters={[
          { key: "region", label: "Region" },
          { key: "type", label: "Type" },
        ]}
        searchPlaceholder="Search locations…"
      />
    </div>
  );
}
