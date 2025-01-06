import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function Header({ returnHome }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  function handleSearchInput(event) {
    if (event.key === "Enter") {
      executeSearch();
    }
  }

  function handleSearchButton() {
    executeSearch();
  }

  function executeSearch() {
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }

    router.push(`/pokemon?${params.toString()}`);
  }

  return (
    <header>
      <button onClick={returnHome} className="buttons homeButton">
        <i className="fa-solid fa-house"></i>
      </button>
      <div className="searchbar">
        <input
          className="buttons searchFor"
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearchInput}
        />
        <button onClick={handleSearchButton} className="buttons searchButton">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div></div>
    </header>
  );
}

export default Header;
