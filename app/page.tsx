
import Image from "next/image";
import { pokemonServiceGetAll, pokemonServiceGetAllFile } from "./services/pokemonService";
import PokemonList from "./components/pokemonList";
import ScrollToTop from "./components/scrollToTop";
import Footer from "./components/footer";
import ThemeSwitcher from "./components/themeSwitcher";
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
      <header className="pokedex-header">
        <div className="main-container">
          <div className="header-content">
            <Image
              src="/pokeball_icon.svg"
              alt="Pokéball"
              width={40}
              height={40}
              className="pokeball-icon"
            />
            <div className="header-text">
              <h1 className="pokedex-title">PokeNext</h1>
            </div>
          </div>
        </div>
        <ThemeSwitcher />
      </header>
      <main className="main-container">
        <PokemonList pokemonData={pokemonGetService} readFromFile={readFromFile}/>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}