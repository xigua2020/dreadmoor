import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbListing from "@/components/DbListing";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { blueprints } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Blueprints – All Blueprint Locations & Unlocks",
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
      <div className="mt-6">
        <DbListing
          title="Blueprints database"
          intro="Verified blueprint locations in DREADMOOR and what each blueprint unlocks."
          columns={["Blueprint", "Unlocks", "Location"]}
          rows={blueprints.map((b) => ({
            cells: [b.name, b.unlocks ?? "—", b.location ?? "—"],
          }))}
        />
      </div>
    </div>
  );
}
