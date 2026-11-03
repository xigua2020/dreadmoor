/**
 * Guide articles: Markdown files in content/guides/.
 *
 * Frontmatter:
 *   title, description, category, updated (YYYY-MM-DD)   — required
 *   version   — game version the guide was verified against, e.g. "EA 1.0"
 *   image     — cover image path (public/)
 *   takeaways — string[] quick-guide bullet points
 *   faq       — [{ q, a }] only real player questions
 *   sources   — [{ label, url? }] internal source record (research/)
 *   related   — [slug] of related guides
 *
 * Only verified, released-game content may be published here.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideSource {
  label: string;
  url?: string;
}

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  updated: string;
  version?: string;
  image?: string;
}

export interface Guide extends GuideMeta {
  html: string;
  toc: TocItem[];
  takeaways: string[];
  faq: GuideFaq[];
  sources: GuideSource[];
  related: string[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Extract h2/h3 headings from Markdown (skipping fenced code blocks). */
function extractToc(markdown: string): TocItem[] {
  const toc: TocItem[] = [];
  let inCode = false;
  for (const line of markdown.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (match) {
      const text = match[2].replace(/[*_`]/g, "").trim();
      toc.push({ id: slugify(text), text, depth: match[1].length as 2 | 3 });
    }
  }
  return toc;
}

/** Inject id attributes into rendered h2/h3 tags, in TOC order. */
function injectHeadingIds(html: string, toc: TocItem[]): string {
  let i = 0;
  return html.replace(/<h([23])>/g, (full, depth) => {
    const item = toc[i];
    i += 1;
    return item && item.depth === Number(depth) ? `<h${depth} id="${item.id}">` : full;
  });
}

function toMeta(file: string, data: Record<string, unknown>): GuideMeta {
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    category: String(data.category ?? "Guide"),
    updated: String(data.updated ?? ""),
    version: data.version ? String(data.version) : undefined,
    image: data.image ? String(data.image) : undefined,
  };
}

export function getGuides(): GuideMeta[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => toMeta(file, matter(fs.readFileSync(path.join(GUIDES_DIR, file), "utf8")).data))
    .filter((guide) => guide.title)
    .sort((a, b) => b.updated.localeCompare(a.updated));
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const file = path.join(GUIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const toc = extractToc(content);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const faq = Array.isArray(data.faq)
    ? (data.faq as { q?: unknown; a?: unknown }[])
        .filter((f) => f.q && f.a)
        .map((f) => ({ q: String(f.q), a: String(f.a) }))
    : [];
  const sources = Array.isArray(data.sources)
    ? (data.sources as (string | { label?: unknown; url?: unknown })[]).map((s) =>
        typeof s === "string" ? { label: s } : { label: String(s.label ?? ""), url: s.url ? String(s.url) : undefined },
      )
    : [];
  return {
    ...toMeta(`${slug}.md`, data),
    html: injectHeadingIds(processed.toString(), toc),
    toc,
    takeaways: Array.isArray(data.takeaways) ? (data.takeaways as unknown[]).map(String) : [],
    faq,
    sources,
    related: Array.isArray(data.related) ? (data.related as unknown[]).map(String) : [],
  };
}

/** Previous / next guide within the published ordering. */
export function getGuideNeighbors(slug: string): { prev?: GuideMeta; next?: GuideMeta } {
  const guides = getGuides();
  const index = guides.findIndex((g) => g.slug === slug);
  return {
    prev: index > 0 ? guides[index - 1] : undefined,
    next: index >= 0 && index < guides.length - 1 ? guides[index + 1] : undefined,
  };
}
