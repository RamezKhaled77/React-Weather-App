import SearchHistory from "./SearchHistory";
import SearchInProgress from "./SearchInProgress";

export default function SearchBar({
  city,
  setCity,
  searchCity,
  setSearchCity,
  weather,
  searchingAgain,
  setSearchingAgain,
  searchHistory,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim() !== "") {
      setSearchCity(city);
      if (weather && city !== searchCity) setSearchingAgain(true);
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="input">
        <img
          className="search-icon"
          src="./assets/images/icon-search.svg"
          alt="search"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => {
            if (searchHistory.length > 0) {
              document.querySelector(".search-history").classList.add("show");
            }
          }}
          onBlur={() => {
            document.querySelector(".search-history").classList.remove("show");
          }}
          placeholder="Search for a city..."
        />
        {searchHistory.length > 0 && (
          <SearchHistory searchHistory={searchHistory} setCity={setCity} />
        )}
      </div>
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
      <SearchInProgress searchingAgain={searchingAgain} />
    </form>
  );
}
