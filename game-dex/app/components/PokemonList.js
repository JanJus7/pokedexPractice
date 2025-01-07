function PokemonList({ data, onPokemonClick }) {
  const addToFavourites = (pokemon) => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];

    const isAlreadyFavourite = storedFavourites.some(
      (fav) => fav.id === pokemon.id
    );

    if (isAlreadyFavourite) {
      return;
    }

    storedFavourites.push(pokemon);

    localStorage.setItem("favourites", JSON.stringify(storedFavourites));
  };

  const discardFromFavourites = (pokemon) => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];

    const updatedFavourites = storedFavourites.filter(
      (fav) => fav.id !== pokemon.id
    );

    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

    window.location.reload();
  };

  return (
    <div className="pokemon-list">
      {data.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-container">
          <button
            className="pokemon-item"
            onClick={() => onPokemonClick(pokemon.name)}
          >
            <h3>{pokemon.name}</h3>
            <p>Number in the pokedex: {pokemon.id}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </button>
          <button className="boxFav" onClick={() => addToFavourites(pokemon)}>
            <i className="fa-regular fa-heart"></i>
          </button>
          <button
            className="boxFav"
            onClick={() => discardFromFavourites(pokemon)}
          >
            <i className="fa-solid fa-heart-crack"></i>
          </button>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
