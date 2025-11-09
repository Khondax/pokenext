'use client';
import { useEffect, useState, useCallback, useMemo } from "react";
import PokemonCard from "./pokemonCard";
import { pokemonServiceGetAll } from "../services/pokemonService";
import { PokemonDetailsPaginated } from "../interfaces/pokemonInterface";
import Select, { MultiValue } from 'react-select';
import { getType } from "../services/pokemonDataLogic";
import { getSelectStyles, formatOptionLabel, SelectOption } from "./selectStyles";

interface PokemonListProps {
  pokemonData: PokemonDetailsPaginated;
  readFromFile: boolean;
}

export default function PokemonList({pokemonData, readFromFile}: PokemonListProps) {
  const [pokemons, setPokemons] = useState(pokemonData.pokemonData);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<string[]>([]);

  // ESTE MÉTODO ESTÁ AQUÍ COMO EJEMPLO, HABILITARLO MACHACARÍA LA POKEAPI
  useEffect(() => {
    if (readFromFile) return; // Early return if reading from file
    
    const loadAllPokemons = async () => {
      setLoading(true);
      let currentOffset = 100;
      let hasNextPage = pokemonData.hasNextPage;

      // Hacemos peticiones en bloques de 100 hasta completar todos los pokemons
      while (hasNextPage === true) {
        try {
          const response = await pokemonServiceGetAll(currentOffset);
          
          hasNextPage = response.hasNextPage;
          
          setPokemons((prevPokemons) => [...prevPokemons, ...response.pokemonData]);
          currentOffset += 100;
        } catch (error) {
          console.error('Error loading Pokemon data:', error);
          break;
        }
      }

      setLoading(false);
    };

    loadAllPokemons();
  }, [pokemonData.hasNextPage, readFromFile]);

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  }, []);

  const handleTypeChange = useCallback((selectedOptions: MultiValue<SelectOption>) => {
    const selected = selectedOptions?.map(option => option.value) || [];
    setSelectedTypes(selected);
  }, []);

  const handleGenerationChange = useCallback((selectedOptions: MultiValue<SelectOption>) => {
    const selected = selectedOptions?.map(option => option.value) || [];
    setSelectedGeneration(selected);
  }, []);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) => {
      const matchesName = pokemon.evolutionChain.evolutions.some(element => 
        element.name.toLowerCase().includes(filter)
      );
      const matchesType = selectedTypes.length === 0 || 
        pokemon.types.some(type => selectedTypes.includes(type.name.toLowerCase()));
      const matchesGeneration = selectedGeneration.length === 0 || 
        selectedGeneration.includes(pokemon.generation);

      return matchesName && matchesType && matchesGeneration;
    });
  }, [pokemons, filter, selectedTypes, selectedGeneration]);

  // Crear una lista de tipos de Pokémon únicos (sin repetidos) usando useMemo
  const typesList = useMemo(() => {
    const allTypes = [...new Set(pokemons.map(pokemon => pokemon.types.map(type => type.name)).flat())];
    return allTypes.map(type => {
      const pokemonType = getType(type);
      return {
        value: pokemonType.name.toLowerCase(), 
        label: pokemonType.translatedName || pokemonType.name, 
        color: pokemonType.color || '#6B7280'
      };
    });
  }, [pokemons]);

  const generationsList = useMemo(() => {
    const allGenerations = [...new Set(pokemons.map(pokemon => pokemon.generation))];
    return allGenerations.map(generation => {
      return {value: generation, label: generation, color: '#fbbf24'};
    });
  }, [pokemons]);

  return (
      <div>
        <div className="search-filters-container">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Buscar Pokémon por nombre..." 
              value={filter} 
              onChange={handleFilterChange}
              className="search-input"
            />
          </div>
          <div className="filters-row">
            <Select
              closeMenuOnSelect={false}
              isMulti
              placeholder="Filtrar por tipos..."
              options={typesList}
              onChange={handleTypeChange}
              className="custom-select"
              classNamePrefix="css"
              formatOptionLabel={formatOptionLabel}
              styles={getSelectStyles()}
            />
            <Select
              closeMenuOnSelect={false}
              isMulti
              placeholder="Filtrar por generación..."
              options={generationsList}
              onChange={handleGenerationChange}
              className="custom-select"
              classNamePrefix="css"
              formatOptionLabel={formatOptionLabel}
              styles={getSelectStyles()}
            />
          </div>
        </div>
        
        <div className="pokemon-grid">
          {filteredPokemons.map((pokemon, index) => (
            <PokemonCard key={`${pokemon.id}-${index}`} pokemon={pokemon} />
          ))}
        </div>
        
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Cargando más Pokémon...</p>
          </div>
        )}
        
        {!loading && filteredPokemons.length === 0 && (
          <div className="empty-state">
            <div className="pokeball-icon">🔍</div>
            <h3>No se encontraron Pokémon</h3>
            <p>Intenta ajustar los filtros o la búsqueda para encontrar más Pokémon</p>
          </div>
        )}
      </div>
    );

}
