import { Suspense, use } from "react";
import PokemonDetailsItem from "../../components/pokemonDetails";
import { pokemonServiceGetSpeciesData } from "@/app/services/pokemonService";
import LoadingSpinner from "@/app/components/loadingSpinner";

export default function PokemonItem({ params }) {

  const {details} = use(params)
  const pokemonItem = use(pokemonServiceGetSpeciesData(details))

  return (
    <div>
      <h1>Pokémon elegido</h1>
      <p>{pokemonItem.name}</p>
      <Suspense fallback={<LoadingSpinner />}>
        <PokemonDetailsItem pokemonItem={pokemonItem}/>
      </Suspense>
    </div>
  );
}

