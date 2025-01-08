import { useState, useEffect } from "react";

function PokemonList({ data, onPokemonClick }) {
  const [favouritePokemonIds, setFavouritePokemonIds] = useState([]);
  const [comparedPokemonIds, setComparedPokemonIds] = useState([]);
  const [comparedPokemonCount, setComparedPokemonCount] = useState(0);

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    const favouriteIds = storedFavourites.map((pokemon) => pokemon.id);
    setFavouritePokemonIds(favouriteIds);
  }, []);

  useEffect(() => {
    const storedCompares = JSON.parse(localStorage.getItem("compared")) || [];
    const comparedIds = storedCompares.map((pokemon) => pokemon.id);
    setComparedPokemonIds(comparedIds);
    setComparedPokemonCount(comparedIds.length);
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

  const handleCompareToggle = (pokemon) => {
    if (comparedPokemonCount >= 2 && !comparedPokemonIds.includes(pokemon.id)) {
      return;
    }

    const isComparedAlready = comparedPokemonIds.includes(pokemon.id);

    if (isComparedAlready) {
      setComparedPokemonIds(
        comparedPokemonIds.filter((id) => id !== pokemon.id)
      );
      setComparedPokemonCount(comparedPokemonCount - 1);
    } else {
      setComparedPokemonIds([...comparedPokemonIds, pokemon.id]);
      setComparedPokemonCount(comparedPokemonCount + 1);
    }

    const storedCompares = JSON.parse(localStorage.getItem("compared")) || [];
    const updatedCompared = isComparedAlready
      ? storedCompares.filter((comp) => comp.id !== pokemon.id)
      : [...storedCompares, pokemon];
    localStorage.setItem("compared", JSON.stringify(updatedCompared));
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
              className={`boxFavComp ${
                favouritePokemonIds.includes(pokemon.id) ? "pink" : "gray"
              }`}
              onClick={() => handleFavouriteToggle(pokemon)}
            >
              <i className="fa-solid fa-heart"></i>
            </button>
            <h3>{pokemon.name}</h3>
            <button
              className={`boxFavComp ${comparedPokemonIds.includes(pokemon.id) ? "yellow" : "gray"}`}
              onClick={() => handleCompareToggle(pokemon)}
              disabled={
                comparedPokemonCount >= 2 &&
                !comparedPokemonIds.includes(pokemon.id)
              }
            >
              <i className="fa-solid fa-scale-balanced"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
