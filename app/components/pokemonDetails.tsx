"use client";
import { use } from "react";
import { pokemonServiceGetURL } from "../services/pokemonService";
import { PokemonDetails } from "@/app/interfaces/pokemonInterface";

export default function PokemonDetailsItem({ isOpen, pokemonDetailsItem, onClose }: { isOpen: any, pokemonDetailsItem: PokemonDetails, onClose: any }) {
  if (!isOpen) return null

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{pokemonDetailsItem.name}</h1>

        <p className="text-3xl font-bold text-green-600 mb-4">
          {pokemonDetailsItem.id}
        </p>
        {pokemonDetailsItem.evolutionChain.evolutions.map(evolution => (
          <p key={evolution.id}>{evolution.name}</p>
        ))}
        {pokemonDetailsItem.stats.map((stat, index) => (
          <p key={index}>{stat.name}:{stat.baseStat}</p>
        ))}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
