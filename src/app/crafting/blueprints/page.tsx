import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { blueprints, locationHref, recipeHref } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Blueprints – Locations & Unlocks",
  description:
    "DREADMOOR blueprints guide: where to find every blueprint and which crafting recipe or equipment each one unlocks.",
  path: "/crafting/blueprints/",
});

export default function BlueprintsPage() {
  if (!blueprints.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Crafting", path: "/crafting/" }, { name: "Blueprints", path: "/crafting/blueprints/" }])} />
      <Breadcrumbs items={[{ name: "Crafting", href: "/crafting/" }, { name: "Blueprints" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Blueprints</h1>
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        Verified blueprint locations in DREADMOOR and what each blueprint unlocks.
      </p>
      <DbExplorer
        rows={blueprints.map((b) => ({
          id: b.slug,
          icon: "blueprint",
          cells: {
            name: b.name,
            unlocks: b.unlocks ? { parts: [{ text: b.unlocks, href: recipeHref(b.unlocks) ?? undefined }] } : "—",
            location: b.location ? { parts: [{ text: b.location, href: locationHref(b.location) ?? undefined }] } : "—",
            npc: b.npc ?? "—",
          },
          filters: { location: b.location ? [b.location] : [] },
        }))}
        columns={[
          { key: "name", label: "Blueprint", sortable: true },
          { key: "unlocks", label: "Unlocks", sortable: true },
          { key: "location", label: "Location", sortable: true },
          { key: "npc", label: "Related NPC" },
        ]}
        filters={[{ key: "location", label: "Location" }]}
        searchPlaceholder="Search blueprints…"
      />
    </div>
  );
}
