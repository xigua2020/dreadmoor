import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbDetail from "@/components/DbDetail";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bySlug, materialHref, recipes } from "@/lib/data";
import MaybeLink from "@/components/MaybeLink";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(recipes, slug);
  if (!entry) return {};
  return buildMetadata({
    title: `${entry.name} – DREADMOOR Crafting Recipe`,
    description: `How to craft ${entry.name} in DREADMOOR: ingredients, quantities, requirements and effects.`,
    path: `/crafting/recipes/${entry.slug}/`,
    image: entry.image,
  });
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug(recipes, slug);
  if (!entry) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Crafting", path: "/crafting/" }, { name: "Recipes", path: "/crafting/recipes/" }, { name: entry.name, path: `/crafting/recipes/${entry.slug}/` }])} />
      <Breadcrumbs items={[{ name: "Crafting", href: "/crafting/" }, { name: "Recipes", href: "/crafting/recipes/" }, { name: entry.name }]} />
      <h1 className="font-display mb-6 text-3xl font-bold text-ink">{entry.name}</h1>
      <DbDetail
        name={entry.name}
        image={entry.image}
        facts={[
          { label: "Ingredients", value: entry.ingredients?.map((m, i) => (
              <span key={m.item}>
                {i > 0 && ", "}
                <MaybeLink href={materialHref(m.item)}>{m.item} ×{m.qty}</MaybeLink>
              </span>
            )) },
          { label: "Requirements", value: entry.requirements },
          { label: "Effect / Usage", value: entry.effect },
        ]}
        related={[
          { label: "Materials & Locations", href: "/crafting/materials/" },
          { label: "Blueprints", href: "/crafting/blueprints/" },
        ]}
      />
    </div>
  );
}
