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
  Creature,
  Fish,
  FishingSpot,
  LocationEntry,
  Material,
  Quest,
  Recipe,
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

export function bySlug<T extends { slug: string }>(list: T[], slug: string): T | undefined {
  return list.find((entry) => entry.slug === slug);
}
