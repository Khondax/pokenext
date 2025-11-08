
import { pokemonServiceGetAll, pokemonServiceGetAllFile } from "./services/pokemonService";
import PokemonList from "./components/pokemonList";
import LoadingSpinner from "./components/loadingSpinner";
import { PokemonDetailsPaginated } from "./interfaces/pokemonInterface";

const readFromFile = true

export default async function HomePage() {

  let pokemonGetService: PokemonDetailsPaginated

  if (readFromFile) {
    const pokemonFileObject = await pokemonServiceGetAllFile()

    pokemonGetService = {
      pokemonData: pokemonFileObject,
      hasNextPage: false
    }
  } else {
    pokemonGetService = await pokemonServiceGetAll()
  }

  return (
    <div>
      <h1>Pokémon List</h1>
      <PokemonList pokemonData={pokemonGetService} readFromFile={readFromFile}/>
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
