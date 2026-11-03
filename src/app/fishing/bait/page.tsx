import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { bait, fishHref, materialHref } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Bait Guide – All Bait & Lures",
  description:
    "DREADMOOR bait guide: every bait and lure, which fish it attracts, crafting materials, and how to get it — including specialized bait for rare catches.",
  path: "/fishing/bait/",
});

export default function BaitPage() {
  if (!bait.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Fishing", path: "/fishing/" }, { name: "Bait", path: "/fishing/bait/" }])} />
      <Breadcrumbs items={[{ name: "Fishing", href: "/fishing/" }, { name: "Bait & Lures" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Bait &amp; Lures</h1>
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        Every bait verified in DREADMOOR: what it attracts, what it is made from, and how to get it.
      </p>
      <DbExplorer
        rows={bait.map((b) => ({
          id: b.slug,
          href: `/fishing/bait/${b.slug}/`,
          image: b.image,
          icon: b.slug === "earthworm" ? "worm" : "bait",
          iconTint: b.rarity === "Unique" ? "text-copper-light" : "text-teal-light",
          cells: {
            name: b.name,
            usedFor: b.usedFor?.length
              ? { parts: b.usedFor.map((name) => ({ text: name, href: fishHref(name) ?? undefined })) }
              : "—",
            materials: b.materials?.length
              ? { parts: b.materials.map((m) => ({ text: `${m.item} ×${m.qty}`, href: materialHref(m.item) ?? undefined })) }
              : "—",
            howToGet: b.howToGet ?? "—",
          },
          filters: { usedFor: b.usedFor ?? [] },
        }))}
        columns={[
          { key: "name", label: "Bait", sortable: true },
          { key: "usedFor", label: "Used For", sortable: true },
          { key: "materials", label: "Materials" },
          { key: "howToGet", label: "How to Get" },
        ]}
        filters={[{ key: "usedFor", label: "Fish" }]}
        searchPlaceholder="Search bait…"
      />
    </div>
  );
}
