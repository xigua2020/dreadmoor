import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import DbExplorer from "@/components/DbExplorer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { characters, locationHref } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Characters – NPCs, Traders & Roles",
  description:
    "DREADMOOR characters database: Malcolm the player, traders Gill and Bozur, engineer John the Fifth, and Betsy the giant crab — roles, quests and services.",
  path: "/world/characters/",
});

export default function CharactersPage() {
  if (!characters.length) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Characters", path: "/world/characters/" }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Characters" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">DREADMOOR Characters</h1>
      <p className="mb-6 mt-3 max-w-3xl leading-7 text-muted">
        The people of the Submerged Lands — who they are, where to find them, and what each one
        gives you. Verified against the official October 2026 demo build.
      </p>
      <DbExplorer
        rows={characters.map((c) => ({
          id: c.slug,
          href: `/world/characters/${c.slug}/`,
          icon: "quest",
          cells: {
            name: c.name,
            role: c.role ?? "—",
            location: c.location ? { parts: [{ text: c.location, href: locationHref(c.location) ?? undefined }] } : "—",
          },
          filters: { role: c.role ? [c.role] : [] },
        }))}
        columns={[
          { key: "name", label: "Character", sortable: true },
          { key: "role", label: "Role", sortable: true },
          { key: "location", label: "Location", sortable: true },
        ]}
        filters={[{ key: "role", label: "Role" }]}
        searchPlaceholder="Search characters…"
      />
    </div>
  );
}
