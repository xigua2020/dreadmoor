import type { MetadataRoute } from "next";
import { site, nav } from "@/config/site";
import { getGuides } from "@/lib/guides";
import {
  boatUpgrades, creatures, fish, locations, materials, quests, recipes,
  bait, blueprints, fishingSpots,
} from "@/lib/data";

/** Only published pages (with real content) are listed here. */
export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...nav.map((item) => ({
      url: `${site.url}${item.href}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/search/`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${site.url}/about/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/privacy/`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${site.url}/terms/`, changeFrequency: "yearly", priority: 0.1 },
  ];

  for (const guide of getGuides()) {
    urls.push({ url: `${site.url}/guides/${guide.slug}/`, lastModified: guide.updated, changeFrequency: "monthly", priority: 0.7 });
  }
  if (fish.length) urls.push({ url: `${site.url}/fishing/fish-list/`, changeFrequency: "weekly", priority: 0.7 });
  for (const f of fish) urls.push({ url: `${site.url}/fishing/fish-list/${f.slug}/`, changeFrequency: "monthly", priority: 0.6 });
  if (bait.length) urls.push({ url: `${site.url}/fishing/bait/`, changeFrequency: "weekly", priority: 0.7 });
  if (fishingSpots.length) urls.push({ url: `${site.url}/fishing/fishing-spots/`, changeFrequency: "weekly", priority: 0.7 });
  if (boatUpgrades.length) urls.push({ url: `${site.url}/boat/upgrades/`, changeFrequency: "weekly", priority: 0.7 });
  for (const u of boatUpgrades) urls.push({ url: `${site.url}/boat/upgrades/${u.slug}/`, changeFrequency: "monthly", priority: 0.6 });
  if (recipes.length) urls.push({ url: `${site.url}/crafting/recipes/`, changeFrequency: "weekly", priority: 0.7 });
  for (const r of recipes) urls.push({ url: `${site.url}/crafting/recipes/${r.slug}/`, changeFrequency: "monthly", priority: 0.6 });
  if (blueprints.length) urls.push({ url: `${site.url}/crafting/blueprints/`, changeFrequency: "weekly", priority: 0.7 });
  if (materials.length) urls.push({ url: `${site.url}/crafting/materials/`, changeFrequency: "weekly", priority: 0.7 });
  if (locations.length) {
    urls.push({ url: `${site.url}/world/locations/`, changeFrequency: "weekly", priority: 0.7 });
    urls.push({ url: `${site.url}/world/map/`, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const l of locations) urls.push({ url: `${site.url}/world/locations/${l.slug}/`, changeFrequency: "monthly", priority: 0.6 });
  if (creatures.length) urls.push({ url: `${site.url}/world/creatures/`, changeFrequency: "weekly", priority: 0.7 });
  for (const c of creatures) urls.push({ url: `${site.url}/world/creatures/${c.slug}/`, changeFrequency: "monthly", priority: 0.6 });
  for (const q of quests) urls.push({ url: `${site.url}/quests/${q.slug}/`, changeFrequency: "monthly", priority: 0.6 });

  return urls;
}
