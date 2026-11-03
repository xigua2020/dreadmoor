import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbListing from "@/components/DbListing";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { creatures } from "@/lib/data";

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
      <div className="mt-6">
        <DbListing
          title="Creatures database"
          intro="Verified creatures in DREADMOOR: where they appear, how they behave, and what to watch for."
          columns={["Creature", "Type", "Location"]}
          rows={creatures.map((c) => ({
            href: `/world/creatures/${c.slug}/`,
            cells: [c.name, c.type ?? "—", c.location ?? "—"],
          }))}
        />
      </div>
    </div>
  );
}
