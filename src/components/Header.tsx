"use client";

import Link from "next/link";
import { useState } from "react";
import { nav } from "../config/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-teal/20 bg-abyss/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-display text-lg font-bold tracking-wide text-ink">
          DREAD<span className="text-copper-light">MOOR</span>{" "}
          <span className="text-teal-light">Wiki</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-elevated hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search/"
            className="ml-1 rounded border border-teal/40 px-3 py-1.5 text-sm text-teal-light transition-colors hover:bg-teal/10"
          >
            Search
          </Link>
        </nav>
        <button
          className="rounded border border-teal/40 px-3 py-1.5 text-sm text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>
      {open && (
        <nav className="border-t border-teal/20 px-4 pb-4 md:hidden" aria-label="Mobile navigation">
          {[...nav, { label: "Search", href: "/search/" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-teal/10 py-3 text-sm text-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
