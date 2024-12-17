"use client";

import { useState } from "react";
import PokemonDetails from "../../components/PokemonDetails";

export default function Pokemon() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  async function fetchPokemonDetails(pokemonName) {
    // setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    } finally {
      //   setIsLoading(false);
    }
  }

  return (
    <div className="body">
      <div className="main">
        {/* {isLoading && <Loader />} */}
        {selectedPokemon && <PokemonDetails data={selectedPokemon} />}
      </div>
    </div>
  );
}
