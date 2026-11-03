import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { settlements } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Settlements – Services & NPCs",
  description:
    "DREADMOOR settlements database: the Trading Post with its shop, fishing contracts, processing machines, Bunkhouse and Dry Dock — NPCs, services and quests.",
  path: "/world/settlements/",
});

export default function SettlementsPage() {
  if (!settlements.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Settlements", path: "/world/settlements/" }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Settlements" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Settlements</h1>
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        The settlements of the Submerged Lands: who lives there, which services they offer, and
        which quests start within their walls. Verified against the official October 2026 demo
        build; expanded as new settlements are verified.
      </p>
      <DbExplorer
        rows={settlements.map((s) => ({
          id: s.slug,
          href: `/world/settlements/${s.slug}/`,
          icon: "location",
          cells: {
            name: s.name,
            npcs: s.npcs?.join(", ") ?? "—",
            services: s.services?.length ? `${s.services.length} services` : "—",
          },
          filters: {},
        }))}
        columns={[
          { key: "name", label: "Settlement", sortable: true },
          { key: "npcs", label: "NPCs" },
          { key: "services", label: "Services" },
        ]}
        searchPlaceholder="Search settlements…"
      />
    </div>
  );
}
