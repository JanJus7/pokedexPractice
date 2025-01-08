import { useState, useEffect } from "react";

function PokemonList({ data, onPokemonClick }) {
  const [favouritePokemonIds, setFavouritePokemonIds] = useState([]);

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    const favouriteIds = storedFavourites.map((pokemon) => pokemon.id);
    setFavouritePokemonIds(favouriteIds);
  }, []);

  const handleFavouriteToggle = (pokemon) => {
    const isFavourite = favouritePokemonIds.includes(pokemon.id);

    if (isFavourite) {
      setFavouritePokemonIds(
        favouritePokemonIds.filter((id) => id !== pokemon.id)
      );
    } else {
      setFavouritePokemonIds([...favouritePokemonIds, pokemon.id]);
    }

    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    const updatedFavourites = isFavourite
      ? storedFavourites.filter((fav) => fav.id !== pokemon.id)
      : [...storedFavourites, pokemon];
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className="pokemon-list">
      {data.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-container">
          <button
            className="pokemon-item"
            onClick={() => onPokemonClick(pokemon.name)}
          >
            <p>Number in the pokedex: {pokemon.id}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </button>
          <div className="nameAndFav">
            <button
              className={`boxFav ${
                favouritePokemonIds.includes(pokemon.id) ? "pink" : "gray"
              }`}
              onClick={() => handleFavouriteToggle(pokemon)}
            >
              <i className="fa-solid fa-heart"></i>
            </button>
            <h3>{pokemon.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
