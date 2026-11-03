import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbListing from "@/components/DbListing";
import JsonLd from "@/components/JsonLd";
import MaybeLink from "@/components/MaybeLink";
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
      <div className="mt-6">
        <DbListing
          title="Bait database"
          intro="Every bait verified in DREADMOOR: what it attracts, what it is made from, and how to get it."
          columns={["Bait", "Used For", "Materials", "How to Get"]}
          rows={bait.map((b) => ({
            id: b.slug,
            cells: [
              b.name,
              b.usedFor?.length
                ? b.usedFor.map((name, i) => (
                    <span key={name}>
                      {i > 0 && ", "}
                      <MaybeLink href={fishHref(name)}>{name}</MaybeLink>
                    </span>
                  ))
                : "—",
              b.materials?.length
                ? b.materials.map((m, i) => (
                    <span key={m.item}>
                      {i > 0 && ", "}
                      <MaybeLink href={materialHref(m.item)}>{m.item} ×{m.qty}</MaybeLink>
                    </span>
                  ))
                : "—",
              b.howToGet ?? "—",
            ],
          }))}
        />
      </div>
    </div>
  );
}
