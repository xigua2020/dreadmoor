import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { materialHref, recipes } from "@/lib/data";

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
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        Every verified crafting recipe in DREADMOOR with ingredients, quantities and requirements.
      </p>
      <DbExplorer
        rows={recipes.map((r) => ({
          id: r.slug,
          href: `/crafting/recipes/${r.slug}/`,
          cells: {
            name: r.name,
            station: r.station ?? "—",
            ingredients: r.ingredients?.length
              ? { parts: r.ingredients.map((m) => ({ text: `${m.item} ×${m.qty}`, href: materialHref(m.item) ?? undefined })) }
              : "—",
            requirements: r.requirements ?? "—",
            effect: r.effect ?? "—",
          },
          filters: { station: r.station ? [r.station] : [] },
        }))}
        columns={[
          { key: "name", label: "Item", sortable: true },
          { key: "station", label: "Station", sortable: true },
          { key: "ingredients", label: "Ingredients" },
          { key: "requirements", label: "Requirements" },
          { key: "effect", label: "Effect" },
        ]}
        filters={[{ key: "station", label: "Station" }]}
        searchPlaceholder="Search recipes…"
      />
    </div>
  );
}
