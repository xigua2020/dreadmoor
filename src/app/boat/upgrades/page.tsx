import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbListing from "@/components/DbListing";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { boatUpgrades } from "@/lib/data";

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
      <div className="mt-6">
        <DbListing
          title="Boat upgrades database"
          intro="Every verified trawler upgrade in DREADMOOR with its component, required materials, cost and effect."
          columns={["Upgrade", "Component", "Materials", "Cost", "Effect"]}
          rows={boatUpgrades.map((u) => ({
            href: `/boat/upgrades/${u.slug}/`,
            cells: [
              u.name,
              u.component ?? "—",
              u.materials?.map((m) => `${m.item} ×${m.qty}`).join(", ") ?? "—",
              u.cost ?? "—",
              u.effect ?? "—",
            ],
          }))}
        />
      </div>
    </div>
  );
}
