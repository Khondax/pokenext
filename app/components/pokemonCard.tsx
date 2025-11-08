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

  const [activeModal, setActiveModal] = useState(null);

  const handleOpenCard = (pokemonIndex) => {
    setActiveModal(pokemonIndex)
  }

  const handleCloseCard = () => {
    setActiveModal(null)
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
            <p key={index}>{type.name}</p>
          ))}
        </div>
        <p>Peso: {pokemon.weight / 10} kilos</p>
        <p>Altura: {pokemon.height / 10} metros</p>
      </div>
      <PokemonDetailsItem
        isOpen={activeModal === pokemon.id}
        pokemonDetailsItem={pokemon}
        onClose={handleCloseCard}
      />
    </div>
  );
}
