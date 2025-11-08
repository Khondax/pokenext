"use client";
import Image from "next/image";
import { PokemonDetails } from "../interfaces/pokemonInterface";
import PokemonDetailsItem from "./pokemonDetails";
import { useState } from "react";

export default function PokemonCard({
  pokemon
}: {
  pokemon: PokemonDetails;
}) {

  const [modalStack, setModalStack] = useState<string[]>([]);

  const handleOpenCard = (pokemonIndex) => {
    setModalStack([pokemonIndex])
  }

  const handleCloseCard = () => {
    setModalStack([])
  }

  const handleOpenNestedCard = (pokemonIndex) => {
    setModalStack(prev => [...prev, pokemonIndex])
  }

  const handleCloseNestedCard = () => {
    setModalStack(prev => prev.slice(0, -1))
  }

  return (
    <div className="cardContainer">
      <div className="card" onClick={() => handleOpenCard(pokemon.id)}>
        <h1 className="text-1xl font-bold mb-4">
          {pokemon.name.toUpperCase()}
        </h1>
        <p>{pokemon.isLegendary ? "Pokemon legendario" : ""}</p>
        <Image
          className=""
          src={pokemon.sprites?.frontDefault}
          alt="pokemon.name"
          width={150}
          height={150}
        />
        <p>{pokemon.generation}</p>
        <div>
          {pokemon.types.map((type, index) => (
            <p key={index}>{type.translatedName}</p>
          ))}
        </div>
        <p>Peso: {pokemon.weight / 10} kilos</p>
        <p>Altura: {pokemon.height / 10} metros</p>
      </div>
      {modalStack.map((pokemonName, index) => (
        <PokemonDetailsItem
          key={`${pokemonName}-${index}`}
          pokemonName={pokemonName}
          pokemonDetailsItem={index === 0 ? pokemon : undefined}
          onClose={index === modalStack.length - 1 ? handleCloseNestedCard : undefined}
          onOpenEvolution={handleOpenNestedCard}
        />
      ))}
    </div>
  );
}
