import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbListing from "@/components/DbListing";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { recipes } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Crafting Recipes – All Recipes, Ingredients & Requirements",
  description:
    "DREADMOOR crafting recipes database: ingredients, quantities, crafting requirements and effects for bait, harpoons, medicine and survival tools.",
  path: "/crafting/recipes/",
});

export default function RecipesPage() {
  if (!recipes.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Crafting", path: "/crafting/" }, { name: "Recipes", path: "/crafting/recipes/" }])} />
      <Breadcrumbs items={[{ name: "Crafting", href: "/crafting/" }, { name: "Recipes" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Crafting Recipes</h1>
      <div className="mt-6">
        <DbListing
          title="Crafting recipes database"
          intro="Every verified crafting recipe in DREADMOOR with ingredients, quantities and requirements."
          columns={["Item", "Ingredients", "Requirements", "Effect"]}
          rows={recipes.map((r) => ({
            href: `/crafting/recipes/${r.slug}/`,
            cells: [
              r.name,
              r.ingredients?.map((m) => `${m.item} ×${m.qty}`).join(", ") ?? "—",
              r.requirements ?? "—",
              r.effect ?? "—",
            ],
          }))}
        />
      </div>
    </div>
  );
}
