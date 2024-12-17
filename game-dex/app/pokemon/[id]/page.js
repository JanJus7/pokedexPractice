"use client";

import { useState, useEffect, use } from "react";
import PokemonDetails from "../../components/PokemonDetails";

export default function Pokemon({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
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
      }
    }

    fetchPokemonDetails();
  }, [id]);

  return (
    <div className="body">
      <div className="main">
        {selectedPokemon && <PokemonDetails data={selectedPokemon} />}
      </div>
    </div>
  );
}
