/**
 * Central site configuration.
 * Set NEXT_PUBLIC_SITE_URL to the production origin before deploying
 * (used for canonical URLs, sitemap, Open Graph and hreflang).
 */
export const site = {
  name: "DREADMOOR Wiki",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  defaultTitle: "DREADMOOR Wiki & Guide – Fishing, Crafting & Boat Upgrades",
  defaultDescription:
    "Explore DREADMOOR Wiki and guides for fishing, fish locations, boat upgrades, crafting recipes, quests, maps, creatures, and survival in the Submerged Lands.",
  ogImage: "/images/hero-trawler-tentacle.webp",
  steamUrl: "https://store.steampowered.com/app/3629430/DREADMOOR/",
  steamCommunityUrl: "https://steamcommunity.com/app/3629430",
  /** Featured gameplay video (config-managed; not an official trailer). */
  featuredVideoId: "qvA5Ovz2mPs",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  adsEnabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "1",
} as const;

export const nav = [
  { label: "Guides", href: "/guides/" },
  { label: "Fishing", href: "/fishing/" },
  { label: "Boat", href: "/boat/" },
  { label: "Crafting", href: "/crafting/" },
  { label: "World", href: "/world/" },
  { label: "Survival", href: "/survival/" },
  { label: "Quests", href: "/quests/" },
] as const;
