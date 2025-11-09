"use client";
import { useEffect, useState, Fragment } from "react";
import { pokemonServiceGetDetailsByName } from "../services/pokemonService";
import { PokemonDetails } from "@/app/interfaces/pokemonInterface";
import Image from "next/image";

interface PokemonDetailsItemProps {
  pokemonName?: string;
  pokemonDetailsItem?: PokemonDetails;
  onClose?: () => void;
  onOpenEvolution?: (pokemonName: string) => void;
}

export default function PokemonDetailsItem({
  pokemonName,
  pokemonDetailsItem,
  onClose,
  onOpenEvolution,
}: PokemonDetailsItemProps) {

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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  if (loading) {
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando Pokémon...</p>
        </div>
      </div>
    );
  }

  if (!currentPokemon) return null

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <button onClick={onClose} className="modal-close">
            ✕
          </button>
          
          <h1 className="modal-pokemon-name">
            {currentPokemon.name}
            {/* {currentPokemon.isLegendary ? '⭐' : ''} */}
            {currentPokemon.isLegendary && (
              <span className="legendary-star"> ⭐</span>
            )}
          </h1>
          
          <div className="pokemon-types">
            {currentPokemon.types.map((type, index) => (
              <span key={index} className={`type-badge type-${type.name.toLowerCase()}`}>
                {type.translatedName || type.name}
              </span>
            ))}
          </div>

          <Image
            className="modal-pokemon-image"
            src={currentPokemon.sprites?.frontDefault || "/pokeball_black.png"}
            alt={currentPokemon.name}
            width={200}
            height={200}
          />

          <div className="generation-badge">
            {currentPokemon.generation}
          </div>
        </div>

        {/* Basic Info */}
        <div className="modal-basic-info">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="stat-item">
              <span className="stat-label">Peso</span>
              <span className="stat-value">{(currentPokemon.weight / 10).toFixed(1)} kg</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Altura</span>
              <span className="stat-value">{(currentPokemon.height / 10).toFixed(1)} m</span>
            </div>
          </div>
        </div>

        {/* Pokemon Stats */}
        <div className="stats-section">
          <h3 className="stats-title">Estadísticas base</h3>
          <div className="stats-grid">
            {currentPokemon.stats.map((stat, index) => {
              const baseStat = stat.baseStat || 0;
              const percentage = Math.min((baseStat / 255) * 100, 100); // Max stat is usually 255
              return (
                <div key={index} className="stat-row">
                  <span className="stat-name">
                    {stat.translatedName || stat.name}
                  </span>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{baseStat}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evolution Chain */}
        {currentPokemon.evolutionChain.evolutions.length > 1 && (
          <div className="evolution-chain">
            <h3 className="evolution-title">Cadena evolutiva</h3>
            <div className="evolution-list">
              {currentPokemon.evolutionChain.evolutions.map((evolution, index) => (
                <Fragment key={evolution.id}>
                  {index > 0 && <div className="evolution-arrow">→</div>}
                  <div 
                    className={`evolution-card ${evolution.id === currentPokemon.id ? 'current' : ''}`}
                    onClick={() => handleEvolutionClick(evolution.name)}
                  >
                    <Image
                      src={evolution.sprites?.frontDefault || "/pokeball_black.png"}
                      alt={evolution.name}
                      width={80}
                      height={80}
                    />
                    <p style={{ fontSize: '0.875rem', fontWeight: '600', marginTop: '0.5rem', textTransform: 'capitalize' }}>
                      {evolution.name}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
