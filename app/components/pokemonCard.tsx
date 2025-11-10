"use client";
import Image from "next/image";
import { PokemonDetails } from "../interfaces/pokemonInterface";
import PokemonDetailsItem from "./pokemonDetails";
import { useState, memo } from "react";

interface PokemonCardProps {
  pokemon: PokemonDetails;
}

const PokemonCard = memo(function PokemonCard({ pokemon }: PokemonCardProps) {

  const [modalStack, setModalStack] = useState<string[]>([]);

  const handleOpenCard = (pokemonName: string) => {
    setModalStack([pokemonName])
  }

  const handleOpenNestedCard = (pokemonName: string) => {
    setModalStack(prev => [...prev, pokemonName])
  }

  const handleCloseNestedCard = () => {
    setModalStack(prev => prev.slice(0, -1))
  }

  // Pilla el primer tipo del pokemon para indicar el color
  const primaryType = pokemon.types[0]?.name?.toLowerCase() || 'normal';
  
  return (
    <>
      <div 
        className="pokemon-card" 
        onClick={() => handleOpenCard(pokemon.name)}
        data-primary-type={primaryType}
      >
        {/* Pokemon ID */}
        <div className="pokemon-id">
          #{pokemon.id.toString().padStart(3, '0')}
        </div>

        {/* Pokemon Name */}
        <h2 className="pokemon-name">
          {pokemon.name}
          {pokemon.isLegendary && (
            <span className="legendary-star"> ⭐</span>
          )}
        </h2>

        {/* Pokemon Image */}
        <Image
          className="pokemon-image"
          src={pokemon.sprites?.frontDefault || "/pokeball_black.png"}
          alt={pokemon.name}
          width={150}
          height={150}
        />

        {/* Pokemon Types */}
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span key={index} className={`type-badge type-${type.name.toLowerCase()}`}>
              {type.translatedName || type.name}
            </span>
          ))}
        </div>

        {/* Generation Badge */}
        <div className="generation-badge">
          {pokemon.generation}
        </div>

        {/* Pokemon Stats */}
        <div className="pokemon-stats">
          <div className="stat-item">
            <span className="stat-label">Peso</span>
            <span className="stat-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Altura</span>
            <span className="stat-value">{(pokemon.height / 10).toFixed(1)} m</span>
          </div>
        </div>
      </div>

      {/* Pokemon Details Modal */}
      {modalStack.map((pokemonName, index) => (
        <PokemonDetailsItem
          key={`${pokemonName}-${index}`}
          pokemonName={pokemonName}
          pokemonDetailsItem={index === 0 ? pokemon : undefined}
          onClose={index === modalStack.length - 1 ? handleCloseNestedCard : undefined}
          onOpenEvolution={handleOpenNestedCard}
        />
      ))}
    </>
  );
});

export default PokemonCard;
