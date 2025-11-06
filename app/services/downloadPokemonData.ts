/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function pokemonServiceGetAll(acc = [], offset: number = 0, limit: number = 50): Promise<any[]> {
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

export async function pokemonServiceGetDetailsByName(
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

export async function pokemonServiceGetSpeciesData(
  name: string
): Promise<any> {
  const pokemonItem_raw = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}/`
  );
  const pokemonItem: any = await pokemonItem_raw.json();

  const pokemonDetails: any = {
    id: pokemonItem.id,
    name: name,
    generation: Number(
      pokemonItem.generation.url?.match(/generation\/(\d+)\//)[1]
    ),
    isLegendary: pokemonItem.is_legendary,
    evolutionChainID: Number(
      pokemonItem.evolution_chain.url.match(/evolution-chain\/(\d+)\//)[1]
    ),
  };

  return pokemonDetails;
}

export async function pokemonServiceGetEvolutionChainData(id: number) {
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
  const evolutions: any[] = [
    {
      id: Number(
        evolutionChain.species.url.match(/pokemon-species\/(\d+)\//)[1]
      ),
      name: evolutionChain.species.name,
    },
  ];

  if (evolutionChain.evolves_to && evolutionChain.evolves_to.length > 0) {
    evolutionChain.evolves_to.forEach((evolution) => {
      evolutions.push(...getEvolutionNames(evolution));
    });
  }

  return evolutions;
}

export async function pokemonServiceGetStatsData(
  id: number
): Promise<any> {
  
  const pokemonStats_raw = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  
  if (!pokemonStats_raw.ok) {
    console.error(`ERROR AL OBTENER EL POKEMON ${id}`)
    return {}
  }

  const pokemonStats = await pokemonStats_raw.json();

  const types = pokemonStats.types.map((element) => element.type.name);
  const stats: any[] = pokemonStats.stats.map((element) => {
    return {
      name: element.stat.name,
      baseStat: element.base_stat,
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