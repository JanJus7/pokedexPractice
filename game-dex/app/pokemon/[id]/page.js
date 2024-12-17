"use client";

import Loader from "../../components/Loader";
import PokemonDetails from "../../components/PokemonDetails";
import { useState, useEffect, use } from "react";

export default function Pokemon({ params }) {
  const unwrappedParams = use(params);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = unwrappedParams;

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!response.ok) {
          throw new Error(`Pokémon not found (status: ${response.status})`);
        }

        const data = await response.json();
        setSelectedPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setSelectedPokemon(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemonDetails();
  }, [id]);

  return (
    <div className="body">
      <div className="main">
        {isLoading && <Loader />}
        {selectedPokemon && <PokemonDetails data={selectedPokemon} />}
      </div>
    </div>
  );
}
