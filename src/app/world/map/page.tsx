import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { locations } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Map – Regions & Locations",
  description:
    "DREADMOOR world map overview: regions, settlements and points of interest across the Submerged Lands.",
  path: "/world/map/",
});

/** Map overview — a charted index of regions and their locations (no fake interactive map). */
export default function WorldMapPage() {
  if (!locations.length) notFound();
  const regions = new Map<string, typeof locations>();
  for (const location of locations) {
    const region = location.region ?? "Submerged Lands";
    regions.set(region, [...(regions.get(region) ?? []), location]);
  }
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Map", path: "/world/map/" }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Map" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR World Map</h1>
      <p className="mt-3 max-w-3xl leading-7 text-muted">
        The charted regions of the Submerged Lands and the locations verified within each.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[...regions.entries()].map(([region, entries]) => (
          <section key={region} className="card p-5">
            <h2 className="font-display text-lg font-bold text-ink">{region}</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <Link href={`/world/locations/${entry.slug}/`} className="text-teal-light hover:underline">
                    {entry.name}
                  </Link>
                  {entry.type && <span className="ml-2 text-xs text-muted">{entry.type}</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
