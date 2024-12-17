"use client";

import Loader from "../components/Loader";
import PokemonList from "../components/PokemonList";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  async function fetchPokemonList() {
    setIsLoading(true);
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();

      const detailedPokemonList = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDetailsResponse = await fetch(pokemon.url);
          return pokemonDetailsResponse.json();
        })
      );

      setPokemonList(detailedPokemonList);
      setSelectedPokemon(null);
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPokemonDetails(pokemonName) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const data = await response.json();
      setSelectedPokemon(data);
      router.push(`/pokemon/${pokemonName}`);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="body">
      <div className="main">
        {isLoading && <Loader />}
        (
        <PokemonList data={pokemonList} onPokemonClick={fetchPokemonDetails} />)
      </div>
    </div>
  );
}
