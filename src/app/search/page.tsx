import type { Metadata } from "next";
import SearchBox from "@/components/SearchBox";
import { buildMetadata } from "@/lib/seo";
import { getSearchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Search the DREADMOOR Wiki",
    description: "Search DREADMOOR Wiki for fish, bait, boat upgrades, crafting recipes, locations, creatures and quests.",
    path: "/search/",
  }),
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="py-10">
      <h1 className="font-display text-3xl font-bold text-ink">Search the Wiki</h1>
      <p className="mt-2 mb-6 text-muted">Find guides, fish, upgrades, recipes, locations and quests.</p>
      <SearchBox items={getSearchIndex()} autoFocus />
    </div>
  );
}
