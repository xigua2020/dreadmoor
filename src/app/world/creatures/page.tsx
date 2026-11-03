import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { creatures, locationHref } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Creatures & Monsters – Types, Locations & Behavior",
  description:
    "DREADMOOR creatures database: monsters and mutated creatures of the Submerged Lands, with locations, behavior and combat notes.",
  path: "/world/creatures/",
});

export default function CreaturesPage() {
  if (!creatures.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Creatures", path: "/world/creatures/" }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Creatures" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Creatures &amp; Monsters</h1>
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        Verified creatures in DREADMOOR: where they appear, how they behave, and what to watch for.
      </p>
      <DbExplorer
        rows={creatures.map((c) => ({
          id: c.slug,
          href: `/world/creatures/${c.slug}/`,
          icon: "creature",
          iconTint: /Enemy|Threat|Hazard/.test(c.type ?? "") ? "text-blood" : "text-teal-light",
          cells: {
            name: c.name,
            type: c.type ?? "—",
            location: c.location ? { parts: [{ text: c.location, href: locationHref(c.location) ?? undefined }] } : "—",
            behavior: c.behavior ?? "—",
          },
          filters: {
            type: c.type ? [c.type] : [],
            location: c.location ? [c.location] : [],
          },
        }))}
        columns={[
          { key: "name", label: "Creature", sortable: true },
          { key: "type", label: "Type", sortable: true },
          { key: "location", label: "Location", sortable: true },
          { key: "behavior", label: "Behavior" },
        ]}
        filters={[
          { key: "type", label: "Type" },
          { key: "location", label: "Location" },
        ]}
        searchPlaceholder="Search creatures…"
      />
    </div>
  );
}
