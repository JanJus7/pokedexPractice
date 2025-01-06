"use client";

import "../globals.css";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { useRouter } from "next/navigation";
import { useState, createContext } from "react";

export const FilterContext = createContext();

export default function Layout({ children }) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("");

  function returnHome() {
    router.push("/pokemon");
  }

  function findPokemon(searchInput) {
    const pokemonName = searchInput.toLowerCase();
    if (pokemonName) {
      router.push(`/pokemon/${pokemonName}`);
    }
  }

  return (
    <html lang="en">
      <body className={"box"}>
        <FilterContext.Provider value={{ selectedType, setSelectedType }}>
          <Header returnHome={returnHome} findPokemon={findPokemon} />
          <Navigation />
          {children}
        </FilterContext.Provider>
      </body>
    </html>
  );
}
