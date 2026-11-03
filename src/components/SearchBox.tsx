"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SearchItem } from "../lib/types";

/** Client-side wiki search over the build-time index. */
export default function SearchBox({ items, autoFocus = false }: { items: SearchItem[]; autoFocus?: boolean }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.section.toLowerCase().includes(q),
      )
      .slice(0, 12);
  }, [items, query]);

  return (
    <div>
      <label htmlFor="wiki-search" className="sr-only">Search the wiki</label>
      <input
        id="wiki-search"
        type="search"
        value={query}
        autoFocus={autoFocus}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search fish, upgrades, recipes, quests…"
        className="w-full rounded-lg border border-teal/40 bg-surface px-4 py-3 text-ink placeholder:text-muted/70 focus:border-teal-light focus:outline-none"
      />
      {query.trim().length >= 2 && (
        <ul className="mt-3 divide-y divide-teal/10 overflow-hidden rounded-lg border border-teal/30 bg-surface">
          {results.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted">No results for “{query}”.</li>
          )}
          {results.map((item) => (
            <li key={item.href + item.title}>
              <Link href={item.href} className="block px-4 py-3 hover:bg-elevated">
                <span className="mr-2 rounded bg-teal/15 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-teal-light">
                  {item.section}
                </span>
                <span className="font-medium text-ink">{item.title}</span>
                <span className="mt-0.5 block text-sm text-muted">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
