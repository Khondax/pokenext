"use client";
import { use, useEffect, useState } from "react";
import { pokemonServiceGetDetailsByName, pokemonServiceGetURL } from "../services/pokemonService";
import { PokemonDetails } from "@/app/interfaces/pokemonInterface";
import Image from "next/image";

export default function PokemonDetailsItem({
  pokemonName,
  pokemonDetailsItem,
  onClose,
  onOpenEvolution,
}: {
  pokemonName?: string
  pokemonDetailsItem?: PokemonDetails;
  onClose: any
  onOpenEvolution?: (pokemonName: string) => void
}) {

  const [currentPokemon, setCurrentPokemon] = useState<PokemonDetails | null>(pokemonDetailsItem || null)
  const [loading, setLoading] = useState(false)

  // Si se proporciona un pokemonId pero no pokemonDetailsItem, cargar los datos
  useEffect(() => {
    if (pokemonName && !pokemonDetailsItem) {
      setLoading(true);
      // Buscar el pokemon por ID en la cadena evolutiva del pokemon inicial
      // O hacer una llamada a la API si es necesario
      loadPokemonByName(pokemonName);
    }
  }, [pokemonName, pokemonDetailsItem]);

  const loadPokemonByName = async (evolutionName: string) => {
    try {
      // Si tenemos pokemonDetailsItem, buscar en su cadena evolutiva primero
      const fullDetails = await pokemonServiceGetDetailsByName(evolutionName);
      setCurrentPokemon(fullDetails);
    } catch (error) {
      console.error("Error loading pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEvolutionClick = (evolutionID: string) => {
    if (onOpenEvolution) {
      onOpenEvolution(evolutionID)
    }
  }

  if (loading) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white p-4 rounded">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!currentPokemon) return null

  console.log('DAME EL POKEMON ACTUAL')
  console.log(currentPokemon)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{currentPokemon.name}</h1>
        <Image
          className=""
          src={currentPokemon.sprites?.frontDefault}
          alt="pokemon.name"
          width={150}
          height={150}
        />
        <p>{currentPokemon.generation}</p>
        <div>
          {currentPokemon.types.map((type, index) => (
            <p key={index}>{type.name}</p>
          ))}
        </div>
        <br />
        <div>
          {currentPokemon.evolutionChain.evolutions.map((evolution) => (
            <div className="evolutionCard" key={evolution.id} onClick={() => handleEvolutionClick(evolution.name)}>
              <Image
                className=""
                src={evolution.sprites?.frontDefault}
                alt={String(evolution.id)}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
        <br />
        <div>
          {currentPokemon.stats.map((stat, index) => (
            <p key={index}>
              {stat.translatedName}:{stat.baseStat}
            </p>
          ))}
        </div>
        <br />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
