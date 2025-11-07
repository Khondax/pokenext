/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { use, useEffect, useState } from "react";
import PokemonCard from "./pokemonCard";
import { pokemonServiceGetAll } from "../services/pokemonService";
import { PokemonDetailsPaginated } from "../interfaces/pokemonInterface";
import PokemonDetailsItem from "./pokemonDetails";
import Select, { StylesConfig }  from 'react-select'

export default function PokemonList({pokemonData, readFromFile}: {pokemonData: PokemonDetailsPaginated, readFromFile: boolean}) {
  const [pokemons, setPokemons] = useState(pokemonData.pokemonData);
  const [loading, setLoading] = useState(false); 
  const [activeModal, setActiveModal] = useState(null);
  const [filter, setFilter] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Filtro por tipos (múltiples)
  const [typesList, setTypesList] = useState<any[]>([]); // Lista de tipos disponibles
  const [selectedGeneration, setSelectedGeneration] = useState<any[]>([]); // Lista de tipos disponibles
  const [generationsList, setGenerationsList] = useState<any[]>([]); // Lista de tipos disponibles

  // ESTE MÉTODO ESTÁ AQUÍ COMO EJEMPLO, HABILITARLO MACHACARÍA LA POKEAPI
  if (!readFromFile) {
    // Función para cargar todos los pokemons en paralelo
    const loadAllPokemons = async () => {
      setLoading(true);
      let currentOffset = 100;
      let hasNextPage = pokemonData.hasNextPage
  
      // Hacemos peticiones en bloques de 100 hasta completar todos los pokemons
      while (hasNextPage === true) {
        const response = await pokemonServiceGetAll(currentOffset)
        
        hasNextPage = response.hasNextPage
        
        setPokemons((prevPokemons) => [...prevPokemons, ...response.pokemonData]);
        currentOffset += 100;
      }
  
      setLoading(false);
    };
  
    useEffect(() => {
      loadAllPokemons(); // Cargamos todos los pokemons en cuanto se carga la página
    }, []);
  }

  const handleOpenCard = (pokemonIndex) => {
    setActiveModal(pokemonIndex)
  }
  const handleCloseCard = () => {
    setActiveModal(null)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  }

  const handleTypeChange = (selectedOptions) => {
    const selected = Array.from(selectedOptions, option => option.value);
    setSelectedTypes(selected); // Actualizamos el estado con los tipos seleccionados
  };

  const handleGenerationChange = (selectedOptions) => {
    const selected = Array.from(selectedOptions, option => option.value);
    setSelectedGeneration(selected); // Actualizamos el estado con los tipos seleccionados
  };

  const filteredPokemons = pokemons.filter((pokemon) =>  {
    const matchesName = pokemon.evolutionChain.evolutions.some(element => element.name.toLowerCase().includes(filter))
    const matchesType = selectedTypes.length === 0 || pokemon.types.some(type => selectedTypes.includes(type.toLowerCase()))
    const matchesGeneration = selectedGeneration.length === 0 || selectedGeneration.includes(pokemon.generation)

    return matchesName && matchesType && matchesGeneration
  });

  // Crear una lista de tipos de Pokémon únicos (sin repetidos)
  useEffect(() => {
    const allTypes = [...new Set(pokemons.map(pokemon => pokemon.types).flat())]
    const typesOptions = allTypes.map(type => {
      return {value: type, label: type, color: ''}
    })

    const allGenerations = [...new Set(pokemons.map(pokemon => pokemon.generation).flat())]
    const generationsOptions = allGenerations.map(generation => {
      return {value: Number(generation), label: String(generation), color: ''}
    })

    setTypesList(typesOptions); // Establece los tipos únicos disponibles
    setGenerationsList(generationsOptions); // Establece los tipos únicos disponibles
  }, [pokemons]);

  return (
      <div>
        <div className="box">
          <input 
            type="text" 
            placeholder="Buscar por nombre..." 
            value={filter} 
            onChange={handleFilterChange}
            className="searchbar"
          />
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={typesList}
            onChange={handleTypeChange}
            // styles={colourStyles}
          />
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={generationsList}
            onChange={handleGenerationChange}
            // styles={colourStyles}
          />
          {/* <button>Ordenar por ID</button> */}
        </div>
        {filteredPokemons.map((pokemon, index) => (
          <div key={index} className="">
            <PokemonCard onClick={() => handleOpenCard(index)} pokemon={pokemon}/>
            <PokemonDetailsItem isOpen={activeModal === index} pokemonDetailsItem={pokemon} onClose={handleCloseCard}/>
            <p>--------</p>
          </div>
        ))}
      </div>
    );

}
