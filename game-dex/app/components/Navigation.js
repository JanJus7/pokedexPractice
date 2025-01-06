import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Navigation() {
  const [types, setTypes] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedType = searchParams.get("type") || "";

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
    const type = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    router.push(`/pokemon?${params.toString()}`);
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
