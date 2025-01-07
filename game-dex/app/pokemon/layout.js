"use client";

import "../globals.css";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();

  function returnHome() {
    router.push("/pokemon");
  }

  function findPokemon(searchInput) {
    const element = searchInput.trim().toLowerCase();
    router.push(`/pokemon?search=${element}`);
  }

  return (
    <html lang="en">
      <body className={"box"}>
          <Header returnHome={returnHome} findPokemon={findPokemon} />
          <Navigation />
          {children}
      </body>
    </html>
  );
}
