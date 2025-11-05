import Image from "next/image";
import { Suspense } from "react";
import { pokemonServiceGetAll } from "./services/pokemonService";
import PokemonList from "./components/pokemonList";
import LoadingSpinner from "./components/loadingSpinner";

export default async function HomePage() {

  const pokemonGetAll = pokemonServiceGetAll()

  return (
    <div>
      <h1>Pokémon List</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <PokemonList pokemonData={pokemonGetAll}/>
      </Suspense>
    </div>
  );
}

  // OLD HOMEPAGE
  // return (
  //   <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
  //     <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
  //       <Image
  //         src="/pokeball_icon.svg"
  //         alt="Next.js logo"
  //         width={100}
  //         height={20}
  //         priority
  //       />
  //     </main>
  //   </div>
  // );
