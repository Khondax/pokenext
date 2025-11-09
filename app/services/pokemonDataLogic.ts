// https://pokeapi.co/api/v2/generation/

import { Type } from "../interfaces/pokemonInterface"

// https://pokeapi.co/api/v2/generation/{pokeApiID}
export const generations = [
  {id: 1, generation: 'Kanto', pokeApiID: 1},
  {id: 2, generation: 'Johto', pokeApiID: 2},
  {id: 3, generation: 'Hoenn', pokeApiID: 3},
  {id: 4, generation: 'Sinnoh', pokeApiID: 4},
  {id: 5, generation: 'Teselia/Unova', pokeApiID: 5},
  {id: 6, generation: 'Kalos', pokeApiID: 6},
  {id: 7, generation: 'Alola', pokeApiID: 7},
  {id: 8, generation: 'Galar', pokeApiID: 8},
  {id: 9, generation: 'Paldea', pokeApiID: 9},
]

// https://pokeapi.co/api/v2/type/?offset=0&limit=100
// https://pokeapi.co/api/v2/type/{pokeApiID}
export const types = [
  {type: 'normal', translatedType: 'Normal', color: '#D2B48C', pokeApiID: 1},
  {type: 'fighting', translatedType: 'Lucha', color: '#bf5858', pokeApiID: 2},
  {type: 'flying', translatedType: 'Volador', color: '#87CEEB', pokeApiID: 3},
  {type: 'poison', translatedType: 'Veneno', color: '#b34fb3', pokeApiID: 4},
  {type: 'ground', translatedType: 'Tierra', color: '#735139', pokeApiID: 5},
  {type: 'rock', translatedType: 'Roca', color: '#63594f', pokeApiID: 6},
  {type: 'bug', translatedType: 'Bicho', color: '#A8B820', pokeApiID: 7},
  {type: 'ghost', translatedType: 'Fantasma', color: '#7B62A3', pokeApiID: 8},
  {type: 'steel', translatedType: 'Acero', color: '#808080', pokeApiID: 9},
  {type: 'fire', translatedType: 'Fuego', color: '#e03a3a', pokeApiID: 10},
  {type: 'water', translatedType: 'Agua', color: '#1E90FF', pokeApiID: 11},
  {type: 'grass', translatedType: 'Planta', color: '#50C878', pokeApiID: 12},
  {type: 'electric', translatedType: 'Eléctrico', color: '#fad343', pokeApiID: 13},
  {type: 'psychic', translatedType: 'Psíquico', color: '#882eff', pokeApiID: 14},
  {type: 'ice', translatedType: 'Hielo', color: '#98D8D8', pokeApiID: 15},
  {type: 'dragon', translatedType: 'Dragón', color: '#fc883a', pokeApiID: 16},
  {type: 'dark', translatedType: 'Siniestro', color: '#414063', pokeApiID: 17},
  {type: 'fairy', translatedType: 'Hada', color: '#EE99AC', pokeApiID: 18},
  // {type: 'stellar', translatedType: 'Astral', color: '#ffffff', pokeApiID: 19},
]

// https://pokeapi.co/api/v2/stat/
// https://pokeapi.co/api/v2/stat/{pokeApiID}
export const stats = [
  {stat: 'hp', translatedStat: 'PS', color: '', pokeApiID: 1},
  {stat: 'attack', translatedStat: 'Ataque', color: '', pokeApiID: 2},
  {stat: 'defense', translatedStat: 'Defensa', color: '', pokeApiID: 3},
  {stat: 'special-attack', translatedStat: 'Ataque Especial', color: '', pokeApiID: 4},
  {stat: 'special-defense', translatedStat: 'Defensa Especial', color: '', pokeApiID: 5},
  {stat: 'speed', translatedStat: 'Velocidad', color: '', pokeApiID: 6},
  {stat: 'accuracy', translatedStat: 'Precisión', color: '', pokeApiID: 7},
  {stat: 'evasion', translatedStat: 'Evasión', color: '', pokeApiID: 8},

]

export function getGeneration(generationID: number): string {
  return generations.find(generation => generation.id === generationID)?.generation || ''
}

export function getType(typeName: string): Type {
  const findType = types.find(type => type.type === typeName)
  return {
    name: findType?.type || typeName,
    translatedName: findType?.translatedType,
    color: findType?.color
  }
}

export function getTypeTranslatedName(typeName: string): string {
  return types.find(type => type.type === typeName)?.translatedType || ''
}

export function getStatTranslatedName(statName: string): string {
  return stats.find(stat => stat.stat === statName)?.translatedStat || ''
}