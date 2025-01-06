"use client";

import Loader from "../components/Loader";
import PokemonList from "../components/PokemonList";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);

  const selectedType = searchParams.get("type");
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    fetchFilteredPokemon(selectedType, searchQuery);
  }, [selectedType, searchQuery]);

  async function fetchFilteredPokemon(type, search) {
    setIsLoading(true);
    try {
      let url = "https://pokeapi.co/api/v2/pokemon?limit=100";

      if (type) {
        const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const typeData = await typeResponse.json();
        const filteredPokemonNames = typeData.pokemon.map((p) => p.pokemon.name);

        const filteredByType = await Promise.all(
          filteredPokemonNames.map(async (name) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            return response.json();
          })
        );

        if (search) {
          setPokemonList(
            filteredByType.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(search.toLowerCase())
            )
          );
        } else {
          setPokemonList(filteredByType);
        }
      } else {
        const response = await fetch(url);
        const data = await response.json();

        const allPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return response.json();
          })
        );

        if (search) {
          setPokemonList(
            allPokemon.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(search.toLowerCase())
            )
          );
        } else {
          setPokemonList(allPokemon);
        }
      }
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function fetchPokemonDetails(pokemonName) {
    router.push(`/pokemon/${pokemonName}`);
  }

  return (
    <div className="body">
      <div className="main">
        {isLoading && <Loader />}
        <PokemonList data={pokemonList} onPokemonClick={fetchPokemonDetails} />
      </div>
    </div>
  );
}
