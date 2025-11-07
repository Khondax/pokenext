'use client'
import Image from "next/image";
import PokemonDetailsItem from "./pokemonDetails";
import { PokemonDetails } from "../interfaces/pokemonInterface";
import "@/app/styles/card.css";

export default function PokemonCard({ onClick, pokemon }: { onClick: any, pokemon: PokemonDetails }) {
  return (
    <div className="cardContainer" onClick={onClick}>
      <div className="card">
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
      </div>
    </div>
  );
}
