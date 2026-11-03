import type { Metadata } from "next";
import { site } from "../config/site";

/** Build per-page metadata with canonical, Open Graph and Twitter Card. */
export function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image ?? site.ogImage;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      images: [{ url: ogImage }],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function jsonLdScript(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
