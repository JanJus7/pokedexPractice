"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PokemonList from "../../components/PokemonList";

export default function FavouritesPage() {
  const router = useRouter();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  const handleRemoveFavourite = (pokemonId) => {
    const updatedFavourites = favourites.filter(
      (pokemon) => pokemon.id !== pokemonId
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className="body">
      <div className="main">
        {favourites.length === 0 ? (
          <p className="textFav">Favourite Pokemon list is empty...</p>
        ) : (
          <PokemonList
            data={favourites}
            onPokemonClick={(pokemonId) => router.push(`/pokemon/${pokemonId}`)}
            onRemoveFavourite={handleRemoveFavourite}
          />
        )}
      </div>
    </div>
  );
}
