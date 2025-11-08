"use client";
import { use, useState } from "react";
import { pokemonServiceGetURL } from "../services/pokemonService";
import { PokemonDetails } from "@/app/interfaces/pokemonInterface";
import Image from "next/image";

export default function PokemonDetailsItem({
  isOpen,
  pokemonDetailsItem,
  onClose,
}: {
  isOpen: any;
  pokemonDetailsItem: PokemonDetails;
  onClose: any;
}) {
  if (!isOpen) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{pokemonDetailsItem.name}</h1>
        <Image
          className=""
          src={pokemonDetailsItem.sprites?.frontDefault}
          alt="pokemon.name"
          width={150}
          height={150}
        />
        <p>{pokemonDetailsItem.generation}</p>
        <div>
          {pokemonDetailsItem.types.map((type, index) => (
            <p key={index}>{type.name}</p>
          ))}
        </div>
        <br />
        <div>
          {pokemonDetailsItem.evolutionChain.evolutions.map((evolution) => (
            <div className="evolutionCard" key={evolution.id}>
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
          {pokemonDetailsItem.stats.map((stat, index) => (
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
