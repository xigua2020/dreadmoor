import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { locationHref, materials, recipeHref, upgradeHref } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Resources – Scrap Metal & Material Locations",
  description:
    "DREADMOOR resources database: scrap metal and every crafting material with gathering locations across the Submerged Lands and what they are used in.",
  path: "/world/resources/",
});

/** Resources & materials — where each crafting material is found in the world. */
export default function ResourcesPage() {
  if (!materials.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Resources", path: "/world/resources/" }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Resources" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Resources &amp; Materials</h1>
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        Verified crafting materials in DREADMOOR, where to gather them in the Submerged Lands, and
        what they are used in.
      </p>
      <DbExplorer
        rows={materials.map((m) => ({
          id: m.slug,
          cells: {
            name: m.name,
            locations: m.locations?.length
              ? { parts: m.locations.map((name) => ({ text: name, href: locationHref(name) ?? undefined })) }
              : "—",
            usedIn: m.usedIn?.length
              ? { parts: m.usedIn.map((name) => ({ text: name, href: (recipeHref(name) ?? upgradeHref(name)) ?? undefined })) }
              : "—",
          },
          filters: { locations: m.locations ?? [] },
        }))}
        columns={[
          { key: "name", label: "Material", sortable: true },
          { key: "locations", label: "Locations" },
          { key: "usedIn", label: "Used In" },
        ]}
        filters={[{ key: "locations", label: "Location" }]}
        searchPlaceholder="Search materials…"
      />
    </div>
  );
}
