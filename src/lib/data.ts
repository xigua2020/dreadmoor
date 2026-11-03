/**
 * Database loaders. Entries live in src/data/*.json and must only contain
 * information verified against the released game (Early Access or later).
 * Empty databases are normal pre-release: dependent pages return 404 until
 * verified entries are added.
 */
import type {
  Bait,
  Blueprint,
  BoatUpgrade,
  Character,
  Creature,
  Fish,
  FishingSpot,
  LocationEntry,
  Material,
  Quest,
  Recipe,
  Settlement,
} from "./types";

import fishData from "../data/fish.json";
import baitData from "../data/bait.json";
import fishingSpotsData from "../data/fishing-spots.json";
import boatUpgradesData from "../data/boat-upgrades.json";
import recipesData from "../data/recipes.json";
import blueprintsData from "../data/blueprints.json";
import materialsData from "../data/materials.json";
import creaturesData from "../data/creatures.json";
import locationsData from "../data/locations.json";
import questsData from "../data/quests.json";
import charactersData from "../data/characters.json";
import settlementsData from "../data/settlements.json";

export const fish = fishData as Fish[];
export const bait = baitData as Bait[];
export const fishingSpots = fishingSpotsData as FishingSpot[];
export const boatUpgrades = boatUpgradesData as BoatUpgrade[];
export const recipes = recipesData as Recipe[];
export const blueprints = blueprintsData as Blueprint[];
export const materials = materialsData as Material[];
export const creatures = creaturesData as Creature[];
export const locations = locationsData as LocationEntry[];
export const quests = questsData as Quest[];
export const characters = charactersData as Character[];
export const settlements = settlementsData as Settlement[];

export function bySlug<T extends { slug: string }>(list: T[], slug: string): T | undefined {
  return list.find((entry) => entry.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Cross-database relation helpers.                                    */
/* Given a display name, return the href of the matching entry if one  */
/* exists — used to link Fish↔Bait↔Spots, Recipe↔Material↔Location,    */
/* Upgrade↔Material, Creature↔Location and Quest↔NPC↔Location.         */
/* ------------------------------------------------------------------ */

function matchByName<T extends { slug: string; name: string }>(list: T[], name?: string): T | undefined {
  if (!name) return undefined;
  const needle = name.trim().toLowerCase();
  return list.find((entry) => entry.name.toLowerCase() === needle || entry.slug === needle);
}

export const fishHref = (name?: string) => {
  const e = matchByName(fish, name);
  return e ? `/fishing/fish-list/${e.slug}/` : null;
};
export const baitHref = (name?: string) => {
  const e = matchByName(bait, name);
  return e ? `/fishing/bait/${e.slug}/` : null;
};
export const materialHref = (name?: string) => {
  const e = matchByName(materials, name);
  return e ? `/world/resources/#${e.slug}` : null;
};
export const locationHref = (name?: string) => {
  const e = matchByName(locations, name);
  return e ? `/world/locations/${e.slug}/` : null;
};
export const recipeHref = (name?: string) => {
  const e = matchByName(recipes, name);
  return e ? `/crafting/recipes/${e.slug}/` : null;
};
export const creatureHref = (name?: string) => {
  const e = matchByName(creatures, name);
  return e ? `/world/creatures/${e.slug}/` : null;
};
export const upgradeHref = (name?: string) => {
  const e = matchByName(boatUpgrades, name);
  return e ? `/boat/upgrades/${e.slug}/` : null;
};
export const questHref = (name?: string) => {
  const e = matchByName(quests, name);
  return e ? `/quests/${e.slug}/` : null;
};
export const characterHref = (name?: string) => {
  const e = matchByName(characters, name);
  return e ? `/world/characters/${e.slug}/` : null;
};
export const settlementHref = (name?: string) => {
  const e = matchByName(settlements, name);
  return e ? `/world/settlements/${e.slug}/` : null;
};
