/** Shared content types for the DREADMOOR databases. */

export interface Fish {
  slug: string;
  name: string;
  type?: string;
  level?: number;
  mutant?: boolean;
  location?: string;
  bait?: string;
  rarity?: string;
  sellValue?: string;
  description?: string;
  image?: string;
  related?: string[];
}

export interface Bait {
  slug: string;
  name: string;
  description?: string;
  usedFor?: string[];
  materials?: MaterialRef[];
  howToGet?: string;
  rarity?: string;
  value?: string;
  image?: string;
}

export interface FishingSpot {
  slug: string;
  name: string;
  region?: string;
  fish?: string[];
  notes?: string;
  image?: string;
}

export interface MaterialRef {
  item: string;
  qty: number | string;
}

export interface BoatUpgrade {
  slug: string;
  name: string;
  component?: string;
  tier?: string;
  level?: string;
  research?: string;
  materials?: MaterialRef[];
  cost?: string;
  effect?: string;
  requirements?: string;
  image?: string;
}

export interface Recipe {
  slug: string;
  name: string;
  station?: string;
  ingredients?: MaterialRef[];
  requirements?: string;
  effect?: string;
  image?: string;
}

export interface Blueprint {
  slug: string;
  name: string;
  unlocks?: string;
  location?: string;
  description?: string;
}

export interface Material {
  slug: string;
  name: string;
  locations?: string[];
  usedIn?: string[];
  description?: string;
  image?: string;
}

export interface Creature {
  slug: string;
  name: string;
  type?: string;
  location?: string;
  behavior?: string;
  weakness?: string;
  description?: string;
  image?: string;
}

export interface LocationEntry {
  slug: string;
  name: string;
  region?: string;
  type?: string;
  description?: string;
  npcs?: string[];
  traders?: string[];
  fish?: string[];
  resources?: string[];
  quests?: string[];
  image?: string;
}

export interface Quest {
  slug: string;
  name: string;
  type?: string;
  giver?: string;
  location?: string;
  prerequisites?: string[];
  objectives?: string[];
  rewards?: string[];
  walkthrough?: string;
  image?: string;
}

/** Search index entry for the client-side wiki search. */
export interface SearchItem {
  title: string;
  href: string;
  description: string;
  section: string;
}
