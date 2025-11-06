'use client'
import Image from "next/image";
import PokemonDetailsItem from "./pokemonDetails";
import { PokemonDetails } from "../interfaces/pokemonInterface";

export default function PokemonCard({ onClick, pokemon }: { onClick: any, pokemon: PokemonDetails }) {
  return (
    <div className="max-w-2xl mx-auto" onClick={onClick}>
      <div className="border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{pokemon.name}</h1>
        <Image
          className="rounded-full border-b-2"
          src={pokemon.sprites?.frontDefault}
          alt="pokemon.name"
          width={150}
          height={150}
        />
        <p>Peso: {pokemon.weight}</p>
        <p>Es legendario: {String(pokemon.isLegendary)}</p>
        {/* <PokemonDetailsItem pokemonDetailsItem={pokemon} /> */}
      </div>
    </div>
  );
}
