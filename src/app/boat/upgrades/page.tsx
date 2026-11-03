import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { boatUpgrades, materialHref } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Boat Upgrades – All Trawler Upgrades, Materials & Costs",
  description:
    "DREADMOOR boat upgrades database: engine, propeller, hull, spotlight and equipment upgrades with materials, costs, effects and requirements.",
  path: "/boat/upgrades/",
});

export default function BoatUpgradesPage() {
  if (!boatUpgrades.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Boat", path: "/boat/" }, { name: "Upgrades", path: "/boat/upgrades/" }])} />
      <Breadcrumbs items={[{ name: "Boat", href: "/boat/" }, { name: "Upgrades" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Boat Upgrades</h1>
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        Every verified trawler upgrade in DREADMOOR with its component, required materials, cost
        and effect.
      </p>
      <DbExplorer
        rows={boatUpgrades.map((u) => ({
          id: u.slug,
          href: `/boat/upgrades/${u.slug}/`,
          cells: {
            name: u.name,
            component: u.component ?? "—",
            materials: u.materials?.length
              ? { parts: u.materials.map((m) => ({ text: `${m.item} ×${m.qty}`, href: materialHref(m.item) ?? undefined })) }
              : "—",
            cost: u.cost ?? "—",
            effect: u.effect ?? "—",
          },
          filters: { component: u.component ? [u.component] : [] },
        }))}
        columns={[
          { key: "name", label: "Upgrade", sortable: true },
          { key: "component", label: "Component", sortable: true },
          { key: "materials", label: "Materials" },
          { key: "cost", label: "Cost", sortable: true },
          { key: "effect", label: "Effect" },
        ]}
        filters={[{ key: "component", label: "Component" }]}
        searchPlaceholder="Search upgrades…"
      />
    </div>
  );
}
