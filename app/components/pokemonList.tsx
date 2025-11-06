/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { use, useEffect, useState } from "react";
import PokemonCard from "./pokemonCard";
import { pokemonServiceGetAll } from "../services/pokemonService";
import { PokemonDetailsPaginated } from "../interfaces/pokemonInterface";
import PokemonDetailsItem from "./pokemonDetails";

export default function PokemonList({pokemonData, readFromFile}: {pokemonData: PokemonDetailsPaginated, readFromFile: boolean}) {
  const [pokemons, setPokemons] = useState(pokemonData.pokemonData);
  const [loading, setLoading] = useState(false); 
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (pokemonIndex) => {
    setActiveModal(pokemonIndex)
  }
  const handleCloseModal = () => {
    setActiveModal(null)
  }

  if (readFromFile) {
    return (
      <div>
        {pokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <PokemonCard onClick={() => handleOpenModal(index)} pokemon={pokemon}/>
            <PokemonDetailsItem isOpen={activeModal === index} pokemonDetailsItem={pokemon} onClose={handleCloseModal}/>
            <p>--------</p>
          </div>
        ))}
      </div>
    );

  } else {
  
    // Función para cargar todos los pokemones en paralelo
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
  
    return (
      <div>
        {pokemons.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <PokemonCard onClick={() => handleCardClick(index)} pokemon={pokemon}/>
            <PokemonDetailsItem isOpen={activeModal === index} pokemonDetailsItem={pokemon} onClose={handleCloseModal}/>
            <p>--------</p>
          </div>
        ))}
      </div>
    );
  }

}

// export default function PokemonList({ pokemonData }) {
//   const pokemonList = use(pokemonData);

//   return (
//     <div>
//       {pokemonList.map((pokemon, index) => (
//         <div key={index} className="pokemon-card">
//           <PokemonCard pokemon={pokemon}/>
//            {/* <Link href={`/pokemon/${pokemon.name}`}>
//               {`Acceder a los detalles de ${pokemon.name}`}
//           </Link> */}
//           <p>--------</p>
//         </div>
//       ))}
//     </div>
//   );
// }

