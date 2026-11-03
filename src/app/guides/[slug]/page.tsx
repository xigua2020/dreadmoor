import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getGuide, getGuides } from "@/lib/guides";

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}/`,
    image: guide.image,
  });
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) notFound();
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }, { name: guide.title, path: `/guides/${guide.slug}/` }])} />
      <Breadcrumbs items={[{ name: "Guides", href: "/guides/" }, { name: guide.title }]} />
      <article>
        <p className="eyebrow mb-2">{guide.category}</p>
        <h1 className="font-display text-3xl font-bold text-ink">{guide.title}</h1>
        {guide.updated && <p className="mt-2 text-sm text-muted">Last updated: {guide.updated}</p>}
        <div className="prose-dm mt-6 max-w-3xl" dangerouslySetInnerHTML={{ __html: guide.html }} />
      </article>
    </div>
  );
}
