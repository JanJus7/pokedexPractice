"use client";

import Loader from "../components/Loader";
import PokemonList from "../components/PokemonList";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { FilterContext } from "./layout";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setFilteredPokemonList] = useState([]);
  const { selectedType } = useContext(FilterContext);

  useEffect(() => {
    if (selectedType) {
      fetchFilteredPokemon(selectedType);
    } else {
      fetchPokemonList();
    }
  }, [selectedType]);

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

      setFilteredPokemonList(detailedPokemonList);
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchFilteredPokemon(type) {
    setIsLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      const pokemonNames = data.pokemon.map((p) => p.pokemon.name);

      const detailedPokemonList = await Promise.all(
        pokemonNames.map(async (name) => {
          const pokemonDetailsResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          return pokemonDetailsResponse.json();
        })
      );

      setFilteredPokemonList(detailedPokemonList);
    } catch (error) {
      console.error("Error filtering Pokémon by type:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPokemonDetails(pokemonName) {
    setIsLoading(true);
    try {
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
