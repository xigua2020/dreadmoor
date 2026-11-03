import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbListing from "@/components/DbListing";
import JsonLd from "@/components/JsonLd";
import MaybeLink from "@/components/MaybeLink";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { locationHref, materials, recipeHref, upgradeHref } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Materials – Scrap Metal & Crafting Material Locations",
  description:
    "DREADMOOR materials database: scrap metal and every crafting material with gathering locations and what they are used in.",
  path: "/crafting/materials/",
});

export default function MaterialsPage() {
  if (!materials.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Crafting", path: "/crafting/" }, { name: "Materials", path: "/crafting/materials/" }])} />
      <Breadcrumbs items={[{ name: "Crafting", href: "/crafting/" }, { name: "Materials" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Crafting Materials</h1>
      <div className="mt-6">
        <DbListing
          title="Materials database"
          intro="Verified crafting materials in DREADMOOR, where to gather them, and what they are used in."
          columns={["Material", "Locations", "Used In"]}
          rows={materials.map((m) => ({
            id: m.slug,
            cells: [
              m.name,
              m.locations?.length
                ? m.locations.map((name, i) => (
                    <span key={name}>
                      {i > 0 && ", "}
                      <MaybeLink href={locationHref(name)}>{name}</MaybeLink>
                    </span>
                  ))
                : "—",
              m.usedIn?.length
                ? m.usedIn.map((name, i) => (
                    <span key={name}>
                      {i > 0 && ", "}
                      <MaybeLink href={recipeHref(name) ?? upgradeHref(name)}>{name}</MaybeLink>
                    </span>
                  ))
                : "—",
            ],
          }))}
        />
      </div>
    </div>
  );
}
