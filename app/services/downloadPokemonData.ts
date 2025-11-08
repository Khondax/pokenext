/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs'

// https://pokeapi.co/api/v2/generation/
// https://pokeapi.co/api/v2/generation/{pokeApiID}
const generations = [
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
const types = [
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
const stats = [
  {stat: 'hp', translatedStat: 'PS', color: '', pokeApiID: 1},
  {stat: 'attack', translatedStat: 'Ataque', color: '', pokeApiID: 2},
  {stat: 'defense', translatedStat: 'Defensa', color: '', pokeApiID: 3},
  {stat: 'special-attack', translatedStat: 'Ataque Especial', color: '', pokeApiID: 4},
  {stat: 'special-defense', translatedStat: 'Defensa Especial', color: '', pokeApiID: 5},
  {stat: 'speed', translatedStat: 'Velocidad', color: '', pokeApiID: 6},
  {stat: 'accuracy', translatedStat: 'Precisión', color: '', pokeApiID: 7},
  {stat: 'evasion', translatedStat: 'Evasión', color: '', pokeApiID: 8},

]

function getGeneration(generationID: number): string {
  return generations.find(generation => generation.id === generationID).generation
}

function getType(typeName: string): any {
  const findType = types.find(type => type.type === typeName)
  return {
    name: findType?.type,
    translatedName: findType?.translatedType,
    color: findType?.color
  }
}

function getTypeTranslatedName(typeName: string): string {
  return types.find(type => type.type === typeName)?.translatedType
}

function getStatTranslatedName(statName: string): string {
  return stats.find(stat => stat.stat === statName)?.translatedStat
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pokemonServiceGetAll(acc = [], offset: number = 0, limit: number = 50): Promise<any[]> {
  const pokemonList_raw = await fetch(`https://pokeapi.co/api/v2/pokemon-species?offset=${offset}&limit=${limit}`)
  const pokemonList = await pokemonList_raw.json()
  
  const pokemonResults: any[] = await Promise.all(pokemonList.results.map(async pokemon => pokemonServiceGetDetailsByName(pokemon.name)))

  acc = acc.concat(pokemonResults)

  if (pokemonList.next) {
    await sleep(100)
    return await pokemonServiceGetAll(acc, offset+limit)
  }
  
  return acc
}

async function pokemonServiceGetDetailsByName(
  pokemonName: string
): Promise<any> {

  await sleep(10)
  const details = await pokemonServiceGetSpeciesData(pokemonName);
  const statsDetails = await pokemonServiceGetStatsData(details.id);
  const evolutions = await pokemonServiceGetEvolutionChainData(details.evolutionChainID);

  return {
    id: details.id,
    name: pokemonName,
    generation: details.generation,
    height: statsDetails.height,
    weight: statsDetails.weight,
    stats: statsDetails.stats,
    types: statsDetails.types,
    isLegendary: details.isLegendary,
    evolutionChain: evolutions,
    sprites: statsDetails.sprites
  };
}

async function pokemonServiceGetSpeciesData(
  name: string
): Promise<any> {
  const pokemonItem_raw = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}/`
  );
  const pokemonItem: any = await pokemonItem_raw.json();

  const pokemonDetails: any = {
    id: pokemonItem.id,
    name: name,
    generation: getGeneration(Number(pokemonItem.generation.url?.match(/generation\/(\d+)\//)[1])),
    isLegendary: pokemonItem.is_legendary,
    evolutionChainID: Number(
      pokemonItem.evolution_chain.url.match(/evolution-chain\/(\d+)\//)[1]
    ),
  };

  return pokemonDetails;
}

async function pokemonServiceGetEvolutionChainData(id: number) {
  const pokemonEvolution_raw = await fetch(
    `https://pokeapi.co/api/v2/evolution-chain/${id}/`
  );
  const pokemonEvolution = await pokemonEvolution_raw.json();

  const evolutionsChain = getEvolutionNames(pokemonEvolution.chain);

  return {
    id: id,
    evolutions: evolutionsChain,
  };
}

function getEvolutionNames(evolutionChain) {
  const evolutionPokeID = Number(evolutionChain.species.url.match(/pokemon-species\/(\d+)\//)[1])
  const evolutions: [] = [
    {
      id: evolutionPokeID,
      name: evolutionChain.species.name,
      sprites: {
        frontDefault: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionPokeID}.png`,
        backDefault: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${evolutionPokeID}.png`
      }
    },
  ];

  if (evolutionChain.evolves_to && evolutionChain.evolves_to.length > 0) {
    evolutionChain.evolves_to.forEach((evolution) => {
      evolutions.push(...getEvolutionNames(evolution));
    });
  }

  return evolutions;
}

async function pokemonServiceGetStatsData(
  id: number
): Promise<any> {
  
  const pokemonStats_raw = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  
  if (!pokemonStats_raw.ok) {
    console.error(`ERROR AL OBTENER EL POKEMON ${id}`)
    return {}
  }

  const pokemonStats = await pokemonStats_raw.json();

  const types = pokemonStats.types.map((element) => getType(element.type.name));
  const stats: any[] = pokemonStats.stats.map((element) => {
    return {
      name: element.stat.name,
      baseStat: element.base_stat,
      translatedName: getStatTranslatedName(element.stat.name)
    };
  });

  const statsDetails: any = {
    height: pokemonStats.height,
    weight: pokemonStats.weight,
    types: types,
    stats: stats,
    sprites: {
      frontDefault: pokemonStats.sprites.front_default,
      backDefault: pokemonStats.sprites.back_default
    }
  };

  return statsDetails;
}

const timeInit = new Date().getTime()
console.log(`Iniciando ejecución`)
const pokemonsData = await pokemonServiceGetAll()
console.log(`Finalizando ejecución en ${new Date().getTime() - timeInit} ms`)

fs.writeFileSync('./app/database/data.json', JSON.stringify(pokemonsData, null, 2));
console.log(`Finalizando guardado en fichero`)