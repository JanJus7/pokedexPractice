import { useRouter, useSearchParams } from "next/navigation";

function Header({ returnHome }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search") || "";

  function handleSearchInput(event) {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value) {
      params.set("search", value);
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
          defaultValue={searchQuery}
          onInput={handleSearchInput}
        />
        <button
          onClick={() => router.push(`/pokemon?${searchParams.toString()}`)}
          className="buttons searchButton"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div></div>
    </header>
  );
}

export default Header;
