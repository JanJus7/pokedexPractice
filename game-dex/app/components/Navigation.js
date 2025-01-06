import React, { useState, useEffect, useContext } from "react";
import { FilterContext } from "../pokemon/layout";

export default function Navigation() {
  const [types, setTypes] = useState([]);
  const { selectedType, setSelectedType } = useContext(FilterContext);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type/");
        const data = await response.json();
        setTypes(data.results);
      } catch (error) {
        console.error("Error fetching Pokémon types:", error);
      }
    }

    fetchTypes();
  }, []);

  function handleTypeChange(e) {
    setSelectedType(e.target.value);
  }

  return (
    <nav>
      
      <select id="typeFilter" value={selectedType} onChange={handleTypeChange}>
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </nav>
  );
}
