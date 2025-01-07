"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PokemonList from "../../components/PokemonList";

export default function FavouritesPage() {
  const router = useRouter();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Wczytywanie ulubionych Pokemonów z localStorage
    const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  const handleRemoveFavourite = (pokemonId) => {
    // Usuwanie Pokemona z ulubionych
    const updatedFavourites = favourites.filter((pokemon) => pokemon.id !== pokemonId);
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className="body">
      <div className="main">
        <h1>Ulubione Pokemony</h1>
        {favourites.length === 0 ? (
          <p>Nie masz jeszcze żadnych ulubionych Pokémonów.</p>
        ) : (
          <PokemonList
            data={favourites}
            onPokemonClick={(pokemonId) => router.push(`/pokemon/${pokemonId}`)}
            onRemoveFavourite={handleRemoveFavourite} // Przesyłamy funkcję do usuwania z ulubionych
          />
        )}
      </div>
    </div>
  );
}
