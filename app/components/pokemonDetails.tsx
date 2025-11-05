"use client";
import { use } from "react";
import { pokemonServiceGetURL } from "../services/pokemonService";
import { PokemonDetails } from "../interfaces/PokemonInterface";

export default function PokemonDetailsItem({pokemonItem}) {

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{pokemonItem.name}</h1>

        <p className="text-3xl font-bold text-green-600 mb-4">
          {pokemonItem.generation}
        </p>
      </div>
    </div>
  );
}
