/**
 * Guide articles: Markdown files in content/guides/ with frontmatter:
 *   title, description, category, updated (YYYY-MM-DD), image?, keywords?
 * Only verified, released-game content may be published here.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  updated: string;
  image?: string;
}

export function getGuides(): GuideMeta[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(GUIDES_DIR, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        category: String(data.category ?? "Guide"),
        updated: String(data.updated ?? ""),
        image: data.image ? String(data.image) : undefined,
      };
    })
    .filter((guide) => guide.title)
    .sort((a, b) => b.updated.localeCompare(a.updated));
}

export async function getGuide(slug: string): Promise<(GuideMeta & { html: string }) | null> {
  const file = path.join(GUIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    category: String(data.category ?? "Guide"),
    updated: String(data.updated ?? ""),
    image: data.image ? String(data.image) : undefined,
    html: processed.toString(),
  };
}
