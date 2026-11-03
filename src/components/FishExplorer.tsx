"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Fish } from "../lib/types";

function unique(values: (string | undefined)[]): string[] {
  return [...new Set(values.filter((v): v is string => Boolean(v)))].sort();
}

/** Fish database explorer: text search + type / rarity / bait / location filters. */
export default function FishExplorer({ entries }: { entries: Fish[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");
  const [bait, setBait] = useState("");
  const [location, setLocation] = useState("");

  const types = useMemo(() => unique(entries.map((e) => e.type)), [entries]);
  const rarities = useMemo(() => unique(entries.map((e) => e.rarity)), [entries]);
  const baits = useMemo(() => unique(entries.map((e) => e.bait)), [entries]);
  const locations = useMemo(() => unique(entries.map((e) => e.location)), [entries]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter(
      (e) =>
        (!q || e.name.toLowerCase().includes(q) || e.description?.toLowerCase().includes(q)) &&
        (!type || e.type === type) &&
        (!rarity || e.rarity === rarity) &&
        (!bait || e.bait === bait) &&
        (!location || e.location === location),
    );
  }, [entries, query, type, rarity, bait, location]);

  const selectClass =
    "rounded-lg border border-teal/40 bg-surface px-3 py-2 text-sm text-ink focus:border-teal-light focus:outline-none";

  return (
    <div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search fish…"
          aria-label="Search fish"
          className={selectClass}
        />
        {[
          { value: type, set: setType, options: types, label: "Type" },
          { value: rarity, set: setRarity, options: rarities, label: "Rarity" },
          { value: bait, set: setBait, options: baits, label: "Bait" },
          { value: location, set: setLocation, options: locations, label: "Location" },
        ].map((filter) => (
          <select
            key={filter.label}
            value={filter.value}
            onChange={(e) => filter.set(e.target.value)}
            aria-label={`Filter by ${filter.label}`}
            className={selectClass}
          >
            <option value="">All {filter.label}s</option>
            {filter.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ))}
      </div>

      <p className="mb-3 text-sm text-muted">
        Showing {results.length} of {entries.length} fish
      </p>

      <div className="overflow-x-auto rounded-lg border border-teal/30">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th><th>Type</th><th>Location</th><th>Bait</th><th>Rarity</th><th>Sell Value</th>
            </tr>
          </thead>
          <tbody>
            {results.map((f) => (
              <tr key={f.slug}>
                <td>
                  <Link href={`/fishing/fish-list/${f.slug}/`} className="font-medium text-teal-light hover:underline">
                    {f.name}
                  </Link>
                </td>
                <td>{f.type ?? "—"}</td>
                <td>{f.location ?? "—"}</td>
                <td>{f.bait ?? "—"}</td>
                <td>{f.rarity ?? "—"}</td>
                <td>{f.sellValue ?? "—"}</td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr><td colSpan={6} className="text-muted">No fish match the current search and filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
