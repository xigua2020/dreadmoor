"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DbIcon from "./DbIcon";

/** Serializable cell value: plain text or a list of linkable parts. */
export type CellValue = string | { parts: { text: string; href?: string }[] };

export interface DbColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface DbFilter {
  key: string;
  label: string;
}

export interface DbRow {
  id: string;
  href?: string;
  icon?: string;
  iconTint?: string;
  cells: Record<string, CellValue>;
  filters?: Record<string, string[]>;
}

function cellText(value: CellValue | undefined): string {
  if (!value) return "";
  return typeof value === "string" ? value : value.parts.map((p) => p.text).join(" ");
}

function compareValues(a: string, b: string): number {
  const na = parseFloat(a.replace(/[^\d.-]/g, ""));
  const nb = parseFloat(b.replace(/[^\d.-]/g, ""));
  if (!Number.isNaN(na) && !Number.isNaN(nb) && a.match(/\d/) && b.match(/\d/)) return na - nb;
  return a.localeCompare(b);
}

/**
 * Unified database explorer used by all listing pages:
 * text search, per-column filters, sorting and linked detail rows.
 */
export default function DbExplorer({
  rows,
  columns,
  filters = [],
  searchPlaceholder = "Search…",
}: {
  rows: DbRow[];
  columns: DbColumn[];
  filters?: DbFilter[];
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState<string>(columns[0]?.key ?? "");
  const [sortDir, setSortDir] = useState<1 | -1>(1);

  const filterOptions = useMemo(() => {
    const options: Record<string, string[]> = {};
    for (const filter of filters) {
      const values = new Set<string>();
      for (const row of rows) {
        const filterValues = row.filters?.[filter.key];
        if (filterValues) filterValues.forEach((v) => values.add(v));
        else {
          const text = cellText(row.cells[filter.key]);
          if (text) values.add(text);
        }
      }
      options[filter.key] = [...values].sort();
    }
    return options;
  }, [rows, filters]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = rows.filter((row) => {
      if (q && !Object.values(row.cells).some((cell) => cellText(cell).toLowerCase().includes(q))) return false;
      for (const [key, value] of Object.entries(activeFilters)) {
        if (!value) continue;
        const filterValues = row.filters?.[key] ?? [cellText(row.cells[key])];
        if (!filterValues.includes(value)) return false;
      }
      return true;
    });
    if (sortKey) {
      filtered.sort((a, b) => sortDir * compareValues(cellText(a.cells[sortKey]), cellText(b.cells[sortKey])));
    }
    return filtered;
  }, [rows, query, activeFilters, sortKey, sortDir]);

  const controlClass =
    "rounded-lg border border-teal/40 bg-surface px-3 py-2 text-sm text-ink focus:border-teal-light focus:outline-none";
  const sortableColumns = columns.filter((c) => c.sortable);

  return (
    <div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label="Search database"
          className={controlClass}
        />
        {filters.map((filter) => (
          <select
            key={filter.key}
            value={activeFilters[filter.key] ?? ""}
            onChange={(e) => setActiveFilters((prev) => ({ ...prev, [filter.key]: e.target.value }))}
            aria-label={`Filter by ${filter.label}`}
            className={controlClass}
          >
            <option value="">All {filter.label}s</option>
            {filterOptions[filter.key]?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ))}
        <div className="flex gap-2">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            aria-label="Sort by"
            className={`${controlClass} flex-1`}
          >
            {sortableColumns.map((column) => (
              <option key={column.key} value={column.key}>Sort: {column.label}</option>
            ))}
          </select>
          <button
            onClick={() => setSortDir((d) => (d === 1 ? -1 : 1))}
            aria-label="Toggle sort direction"
            title={sortDir === 1 ? "Ascending" : "Descending"}
            className={controlClass}
          >
            {sortDir === 1 ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <p className="mb-3 text-sm text-muted">
        Showing {results.length} of {rows.length} entries
      </p>

      <div className="overflow-x-auto rounded-lg border border-teal/30">
        <table className="data-table">
          <thead>
            <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {results.map((row) => (
              <tr key={row.id} id={row.id}>
                {columns.map((column, columnIndex) => {
                  const cell = row.cells[column.key];
                  const content =
                    !cell ? "—" : typeof cell === "string" ? (
                      cell
                    ) : (
                      cell.parts.map((part, i) => (
                        <span key={i}>
                          {i > 0 && ", "}
                          {part.href ? (
                            <Link href={part.href} className="text-teal-light hover:underline">{part.text}</Link>
                          ) : (
                            part.text
                          )}
                        </span>
                      ))
                    );
                  return (
                    <td key={column.key}>
                      {columnIndex === 0 ? (
                        <span className="flex items-center gap-2.5">
                          {row.icon && (
                            <span className={`inline-flex shrink-0 rounded-md bg-teal/10 p-1.5 ${row.iconTint ?? "text-teal-light"}`}>
                              <DbIcon name={row.icon} className="h-4 w-4" />
                            </span>
                          )}
                          {row.href ? (
                            <Link href={row.href} className="font-medium text-teal-light hover:underline">{content}</Link>
                          ) : (
                            <span className="font-medium">{content}</span>
                          )}
                        </span>
                      ) : (
                        content
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-muted">
                  No entries match the current search and filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
