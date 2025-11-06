export interface Pokemon {
  name: string;
  url?: string;
  id?: number;
}

export interface PokemonDetailsPaginated {
  pokemonData: PokemonDetails[];
  hasNextPage: boolean;
  offset?: number;
  limit?: number;
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
  sprites?: Sprites;
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
  sprites?: Sprites;
}

export interface PokemonSpeciesDetailsRaw {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: Color[];
  evolution_chain: EvolutionChain;
  evolves_from_species: null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: Color;
  growth_rate: Color;
  habitat: Color;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
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
  flavor_text: string;
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
  base_score: number;
  rate: number;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: Color;
}

export interface Variety {
  is_default: boolean;
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

export interface Sprites {
  frontDefault?: string
  backDefault?: string;
}
