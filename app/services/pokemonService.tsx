import { Pokemon, PokemonDetails, PokemonSpeciesDetails, PokemonSpeciesDetailsRaw, PokemonStats, Stat } from "../interfaces/PokemonInterface";

export async function pokemonServiceGetAll(acc: Pokemon[] = [], offset: number = 0, limit: number = 10): Promise<Pokemon[]> {
  const pokemonList_raw = await fetch(`https://pokeapi.co/api/v2/pokemon-species?offset=${offset}&limit=${limit}`)
  const pokemonList = await pokemonList_raw.json()
  
  const pokemonResults: Pokemon[] = await pokemonList.results.map(async pokemon => {
    const details = await pokemonServiceGetSpeciesData(pokemon.name)
    const evolutions = await pokemonServiceGetEvolutionChainData(details.evolutionChainID)
    const statsDetails = await pokemonServiceGetStatsData(pokemon.name)

    return {
      id: details.id,
      name: pokemon.name,
      generation: details.generation,
      height: statsDetails.height,
      weight: statsDetails.weight,
      stats: statsDetails.stats,
      types: statsDetails.types,
      isLegendary: details.isLegendary,
      evolutionChain: evolutions
    }
  })

  // Para hacerlo recursivo
  //   if (pokemonList.next) {
  //     return pokemonServiceGetAll(acc, offset+limit)
  //   }

  acc = acc.concat(await Promise.all(pokemonResults))
  
  return acc
}

export async function pokemonServiceGetSpeciesData(name: string): Promise<PokemonSpeciesDetails> {
  const pokemonItem_raw = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
  const pokemonItem: PokemonSpeciesDetailsRaw = await pokemonItem_raw.json()

  const pokemonDetails: PokemonSpeciesDetails = {
    id: pokemonItem.id,
    name: name,
    generation: Number(pokemonItem.generation.url?.match(/generation\/(\d+)\//)[1]),
    isLegendary: pokemonItem.isLegendary,
    evolutionChainID: Number(pokemonItem.evolution_chain.url.match(/evolution-chain\/(\d+)\//)[1])
  }

  return pokemonDetails
}

export async function pokemonServiceGetEvolutionChainData(id: number) {
  const pokemonEvolution_raw = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
  const pokemonEvolution = await pokemonEvolution_raw.json()

  const evolutionsChain = getEvolutionNames(pokemonEvolution.chain)

  return {
    id: id,
    evolutions: evolutionsChain
  }
}

function getEvolutionNames(evolutionChain) {
  
  const evolutions: Pokemon[] = [{
    id: Number(evolutionChain.species.url.match(/pokemon-species\/(\d+)\//)[1]),
    name: evolutionChain.species.name
  }]

  if (evolutionChain.evolves_to && evolutionChain.evolves_to.length > 0) {
    evolutionChain.evolves_to.forEach(evolution => {
      evolutions.push(...getEvolutionNames(evolution));
    });
  }

  return evolutions;
}

export async function pokemonServiceGetStatsData(name: string): Promise<PokemonStats> {
  const pokemonStats_raw = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const pokemonStats = await pokemonStats_raw.json()

  const types = pokemonStats.types.map(element => element.type.name)
  const stats: Stat[] = pokemonStats.stats.map(element => {
    return {
      name: element.stat.name,
      baseStat: element.base_stat
    }
  })

  const statsDetails: PokemonStats = {
    height: pokemonStats.height,
    weight: pokemonStats.weight,
    types: types,
    stats: stats
    // sprites: pokemonStats.sprites.front_default
  }

  return statsDetails
}

export async function pokemonServiceGetURL(url: string) {
  const pokemonItem_raw = await fetch(url)
  const pokemonItem = await pokemonItem_raw.json()

  return pokemonItem
}