import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import AdSlot from "@/components/AdSlot";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getGuide, getGuideNeighbors, getGuides } from "@/lib/guides";
import { site } from "@/config/site";

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
  const { prev, next } = getGuideNeighbors(slug);
  const allGuides = getGuides();
  const relatedGuides = guide.related
    .map((relatedSlug) => allGuides.find((g) => g.slug === relatedSlug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }, { name: guide.title, path: `/guides/${guide.slug}/` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          ...(guide.updated ? { dateModified: guide.updated } : {}),
          ...(guide.image ? { image: `${site.url}${guide.image}` } : {}),
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntityOfPage: `${site.url}/guides/${guide.slug}/`,
        }}
      />
      {guide.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: guide.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
      <Breadcrumbs items={[{ name: "Guides", href: "/guides/" }, { name: guide.title }]} />

      <article className="grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <p className="eyebrow mb-2">{guide.category}</p>
          <h1 className="font-display text-3xl font-bold text-ink">{guide.title}</h1>
          <p className="mt-2 text-sm text-muted">
            {guide.updated && <>Last updated: {guide.updated}</>}
            {guide.version && <> · Verified against game version {guide.version}</>}
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-muted">{guide.description}</p>

          {guide.image && (
            <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl border border-teal/30">
              <Image src={guide.image} alt={`${guide.title} — DREADMOOR guide cover`} fill priority sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
            </div>
          )}

          {guide.takeaways.length > 0 && (
            <section className="card mt-6 border-l-4 border-l-copper p-5" aria-label="Quick guide">
              <h2 className="font-display text-lg font-bold text-ink">Quick Guide — Key Takeaways</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted">
                {guide.takeaways.map((point, i) => <li key={i}>{point}</li>)}
              </ul>
            </section>
          )}

          <div className="prose-dm mt-6 max-w-3xl" dangerouslySetInnerHTML={{ __html: guide.html }} />

          {guide.faq.length > 0 && (
            <section className="mt-10 max-w-3xl" aria-label="Frequently asked questions">
              <h2 className="section-title mb-4">FAQ</h2>
              <div className="space-y-3">
                {guide.faq.map((f, i) => (
                  <details key={i} className="card group p-4">
                    <summary className="cursor-pointer font-semibold text-ink group-open:text-teal-light">{f.q}</summary>
                    <p className="mt-2 text-sm leading-6 text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {guide.sources.length > 0 && (
            <section className="mt-10 max-w-3xl" aria-label="Sources">
              <h2 className="section-title mb-3">Sources</h2>
              <ul className="space-y-1 text-sm text-muted">
                {guide.sources.map((source, i) => (
                  <li key={i}>
                    {source.url ? (
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-teal-light hover:underline">{source.label}</a>
                    ) : (
                      source.label
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedGuides.length > 0 && (
            <section className="mt-10 max-w-3xl" aria-label="Related guides">
              <h2 className="section-title mb-4">Related Guides</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedGuides.map((related) => (
                  <Link key={related.slug} href={`/guides/${related.slug}/`} className="card block p-4">
                    <p className="eyebrow mb-1">{related.category}</p>
                    <h3 className="font-semibold text-ink">{related.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted">{related.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <nav className="mt-12 flex items-stretch justify-between gap-4 border-t border-teal/20 pt-6" aria-label="Guide navigation">
            {prev ? (
              <Link href={`/guides/${prev.slug}/`} className="card max-w-[48%] p-4">
                <span className="text-xs text-muted">← Previous</span>
                <span className="mt-1 block text-sm font-semibold text-ink">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/guides/${next.slug}/`} className="card max-w-[48%] p-4 text-right">
                <span className="text-xs text-muted">Next →</span>
                <span className="mt-1 block text-sm font-semibold text-ink">{next.title}</span>
              </Link>
            ) : <span />}
          </nav>
        </div>

        {/* Table of contents — sticky sidebar on desktop */}
        {guide.toc.length > 0 && (
          <aside className="hidden lg:block">
            <nav className="card sticky top-20 p-5" aria-label="Table of contents">
              <p className="eyebrow mb-3">On This Page</p>
              <ul className="space-y-1.5 text-sm">
                {guide.toc.map((item) => (
                  <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
                    <a href={`#${item.id}`} className="text-muted hover:text-teal-light">{item.text}</a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-teal/10 pt-4">
                <Link href={site.steamUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-teal-light">
                  Play DREADMOOR on Steam ↗
                </Link>
              </div>
            </nav>
          </aside>
        )}
      </article>

      <AdSlot id="guide-bottom" className="mt-10" />
    </div>
  );
}
