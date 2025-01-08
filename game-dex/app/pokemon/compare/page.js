"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PokemonList from "../../components/PokemonList";

export default function ComparePage() {
  const router = useRouter();
  const [compared, setCompared] = useState([]);

  useEffect(() => {
    const storedCompares = JSON.parse(localStorage.getItem("compared")) || [];
    setCompared(storedCompares);
  }, []);

  const handleRemoveCompared = (pokemonId) => {
    const updatedCompared = compared.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
    setCompared(updatedCompared);
    localStorage.setItem("compared", JSON.stringify(updatedCompared));
  };

  return (
    <div className="body">
      <div className="main">
        {compared.length === 0 ? (
          <p className="textFav">Compared Pokemon list is empty...</p>
        ) : (
          <PokemonList
            data={compared}
            onPokemonClick={(pokemonId) => router.push(`/pokemon/${pokemonId}`)}
            onRemoveCompared={handleRemoveCompared}
          />
        )}
      </div>
    </div>
  );
}
