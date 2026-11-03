# DREADMOOR Wiki

Fan-made wiki for the first-person fishing horror adventure **DREADMOOR** (Dream Dock / Digital Vortex Entertainment). Built with Next.js App Router, React, TypeScript and Tailwind CSS 4.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # production build
npm run typecheck  # TypeScript check
```

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production origin, e.g. `https://example.com`. Drives canonical URLs, sitemap, Open Graph and hreflang. **Set this before deploying.** |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (analytics stays off until set). |
| `NEXT_PUBLIC_ADS_ENABLED` | `1` shows reserved ad slots. |

## Content model

Content only covers the **released game** (Early Access or later). No demo/playtest data, no invented values.

- **Databases** — `src/data/*.json` (fish, bait, fishing-spots, boat-upgrades, recipes, blueprints, materials, creatures, locations, quests). Types live in `src/lib/types.ts`.
  - Listing and detail pages are **data-driven**: a database with zero entries returns 404 and is excluded from the sitemap and navigation automatically. Adding verified JSON entries is all that is needed to publish them.
- **Guide articles** — Markdown files in `content/guides/` with frontmatter:
  ```md
  ---
  title: "DREADMOOR Beginner Guide"
  description: "…"
  category: "Beginner"
  updated: "2026-11-10"
  version: "EA 1.0"              # game version the guide was verified against
  image: "/images/…"             # cover image
  takeaways: ["Quick point 1", "Quick point 2"]
  faq: [{ q: "Real question?", a: "Verified answer." }]
  sources: [{ label: "research/ note or URL", url: "https://…" }]
  related: ["other-guide-slug"]
  ---

  ## Headings become the automatic table of contents.
  ```
  The article template renders cover, key takeaways, auto TOC (from `##`/`###`), body, FAQ (+ FAQPage JSON-LD when present), sources, related guides, prev/next navigation and last-updated/version line. Files appear automatically at `/guides/<filename>/`, in listings, search and sitemap.
- **Cross-database links** — entries referencing each other by exact name (e.g. a fish's `bait`, a recipe's `ingredients`, a location's `fish`) are automatically linked to the matching entry pages.
- **Site config** — `src/config/site.ts` (name, URLs, featured video ID, nav).

## SEO

- Per-page Title / Meta Description / canonical / hreflang (`en` + `x-default`) via `src/lib/seo.ts`.
- `sitemap.ts` and `robots.ts` are generated from the same data that drives the pages — empty databases never enter the sitemap.
- JSON-LD: WebSite + VideoGame on the homepage, BreadcrumbList on subpages. No fabricated ratings, reviews or FAQ markup.
- Additional locales (ru / es / pt-br) are intentionally not scaffolded yet — they go live only with real translations.

## Images

User-provided screenshots and official artwork live in `public/images/`. Keep alt text accurate; do not present pre-release screenshots as current-version documentation inside database entries.
