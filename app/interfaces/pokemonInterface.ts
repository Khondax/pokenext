export interface Pokemon {
  name: string;
  url?: string;
  id?: number;
}

export interface PokemonDetails {
  id: number;
  name: string;
  generation: number;
  height: number;
  weight: number;
  stats: Stat[];
  types: string[];
  isLegendary: boolean;
  evolutionChain: EvolutionChainData;
  // TODO: sprites: Sprites;
}

export interface PokemonSpeciesDetails {
  id: number;
  name: string;
  generation: number;
  isLegendary: boolean;
  evolutionChainID: number;
}

export interface PokemonStats {
  types: string[];
  stats: Stat[];
  height: number;
  weight: number;
  // sprites: string;
}

export interface PokemonSpeciesDetailsRaw {
  baseHappiness: number;
  captureRate: number;
  color: Color;
  eggGroups: Color[];
  evolution_chain: EvolutionChain;
  evolvesFromSpecies: null;
  flavorTextEntries: FlavorTextEntry[];
  formDescriptions: any[];
  formsSwitchable: boolean;
  genderRate: number;
  genera: Genus[];
  generation: Color;
  growthRate: Color;
  habitat: Color;
  hasGenderDifferences: boolean;
  hatchCounter: number;
  id: number;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  name: string;
  names: Name[];
  order: number;
  palParkEncounters: PalParkEncounter[];
  pokedexNumbers: PokedexNumber[];
  shape: Color;
  varieties: Variety[];
}

export interface Color {
  name: string;
  url: string;
}

export interface EvolutionChain {
  url: string;
}

export interface FlavorTextEntry {
  flavorText: string;
  language: Color;
  version: Color;
}

export interface Genus {
  genus: string;
  language: Color;
}

export interface Name {
  language: Color;
  name: string;
}

export interface PalParkEncounter {
  area: Color;
  baseScore: number;
  rate: number;
}

export interface PokedexNumber {
  entryNumber: number;
  pokedex: Color;
}

export interface Variety {
  isDefault: boolean;
  pokemon: Color;
}

export interface Stat {
  name: string;
  baseStat: number;
}

export interface EvolutionChainData {
  id: number;
  evolutions: Pokemon[];
}
