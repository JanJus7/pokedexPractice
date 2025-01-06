"use client";

import Loader from "../components/Loader";
import PokemonList from "../components/PokemonList";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(250);

  const searchQuery = searchParams.get("search") || "";
  const selectedType = searchParams.get("type") || "";

  function loadMore() {
    setItemsPerPage((prev) => prev + 250);
  }

  useEffect(() => {
    async function fetchPokemonData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=1320`
        );
        const data = await response.json();

        let allPokemonData = data.results;

        if (selectedType) {
          allPokemonData = await filterByType(allPokemonData, selectedType);
        }

        if (searchQuery) {
          allPokemonData = allPokemonData.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        const pokemonDetails = await Promise.all(
          allPokemonData.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            return detailResponse.json();
          })
        );

        setAllPokemon(pokemonDetails);
        setFilteredPokemon(pokemonDetails.slice(0, itemsPerPage));
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemonData();
  }, [searchQuery, selectedType]);

  useEffect(() => {
    setFilteredPokemon(allPokemon.slice(0, itemsPerPage));
  }, [itemsPerPage]);

  async function filterByType(pokemonList, type) {
    const filteredPokemon = [];
    for (const pokemon of pokemonList) {
      const detailResponse = await fetch(pokemon.url);
      const pokemonDetails = await detailResponse.json();

      if (pokemonDetails.types.some((t) => t.type.name === type)) {
        filteredPokemon.push(pokemon);
      }
    }
    return filteredPokemon;
  }

  function handlePokemonClick(pokemonName) {
    router.push(`/pokemon/${pokemonName}`);
  }

  return (
    <div className="body">
      <div className="main">
        {isLoading && <Loader />}
        <PokemonList
          data={filteredPokemon}
          onPokemonClick={handlePokemonClick}
        />
      </div>
      <button onClick={loadMore} className="more">
        Load more results
      </button>
    </div>
  );
}
