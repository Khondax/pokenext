'use client';
import { use } from "react";
import Link from 'next/link'

export default function PokemonList({ pokemonData }) {
  const pokemonList = use(pokemonData);

  return (
    <div>
      {pokemonList.map((pokemon, index) => (
        <div key={index} className="pokemon-card">
          <h3>{pokemon.name}</h3>
           <Link href={`/pokemon/${pokemon.name}`}>
              {`Acceder a los detalles de ${pokemon.name}`}
          </Link>
          <p>--------</p>
        </div>
      ))}
    </div>
  );
}
