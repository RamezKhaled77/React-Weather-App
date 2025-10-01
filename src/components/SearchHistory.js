export default function SearchHistory({ searchHistory, setCity }) {
  return (
    <div className="search-history">
      <h5>Search History</h5>
      <ul className="history-list">
        {searchHistory.map((city, index) => (
          <li key={index} onClick={() => setCity(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}
