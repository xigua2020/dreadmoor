import { nav, site } from "../config/site";
import {
  bait,
  blueprints,
  boatUpgrades,
  creatures,
  fish,
  fishingSpots,
  locations,
  materials,
  quests,
  recipes,
} from "./data";
import { getGuides } from "./guides";
import type { SearchItem } from "./types";

const STATIC_PAGES: SearchItem[] = [
  { title: "DREADMOOR Wiki", href: "/", description: site.defaultDescription, section: "Home" },
  {
    title: "DREADMOOR Guides",
    href: "/guides/",
    description: "Beginner guide, controls, tips and walkthroughs for DREADMOOR.",
    section: "Guides",
  },
  {
    title: "Fishing & Fish",
    href: "/fishing/",
    description: "Fishing mechanics, fish species, bait and fishing spots.",
    section: "Fishing",
  },
  {
    title: "Boat & Upgrades",
    href: "/boat/",
    description: "Trawler upgrades, engine, hull, fuel and repairs.",
    section: "Boat",
  },
  {
    title: "Crafting & Equipment",
    href: "/crafting/",
    description: "Crafting recipes, blueprints and survival materials.",
    section: "Crafting",
  },
  {
    title: "World & Locations",
    href: "/world/",
    description: "The Submerged Lands: regions, settlements and landmarks.",
    section: "World",
  },
  {
    title: "Survival & Combat",
    href: "/survival/",
    description: "Survive the Sea Blight and hostile creatures on land and water.",
    section: "Survival",
  },
  {
    title: "Quests & Walkthrough",
    href: "/quests/",
    description: "Story quests, objectives, NPCs and rewards.",
    section: "Quests",
  },
];

/** Search index over everything currently published (data-driven). */
export function getSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [...STATIC_PAGES];
  for (const guide of getGuides()) {
    items.push({
      title: guide.title,
      href: `/guides/${guide.slug}/`,
      description: guide.description,
      section: "Guides",
    });
  }
  fish.forEach((e) => items.push({ title: e.name, href: `/fishing/fish-list/${e.slug}/`, description: e.description ?? "Fish entry", section: "Fish" }));
  bait.forEach((e) => items.push({ title: e.name, href: "/fishing/bait/", description: e.description ?? "Bait entry", section: "Fishing" }));
  fishingSpots.forEach((e) => items.push({ title: e.name, href: "/fishing/fishing-spots/", description: e.notes ?? "Fishing spot", section: "Fishing" }));
  boatUpgrades.forEach((e) => items.push({ title: e.name, href: `/boat/upgrades/${e.slug}/`, description: e.effect ?? "Boat upgrade", section: "Boat" }));
  recipes.forEach((e) => items.push({ title: e.name, href: `/crafting/recipes/${e.slug}/`, description: e.effect ?? "Crafting recipe", section: "Crafting" }));
  blueprints.forEach((e) => items.push({ title: e.name, href: "/crafting/blueprints/", description: e.description ?? "Blueprint", section: "Crafting" }));
  materials.forEach((e) => items.push({ title: e.name, href: "/crafting/materials/", description: e.description ?? "Material", section: "Crafting" }));
  creatures.forEach((e) => items.push({ title: e.name, href: `/world/creatures/${e.slug}/`, description: e.description ?? "Creature", section: "Creatures" }));
  locations.forEach((e) => items.push({ title: e.name, href: `/world/locations/${e.slug}/`, description: e.description ?? "Location", section: "World" }));
  quests.forEach((e) => items.push({ title: e.name, href: `/quests/${e.slug}/`, description: e.walkthrough?.slice(0, 120) ?? "Quest", section: "Quests" }));
  return items;
}

export { nav };
