export default function SearchInProgress({ searchingAgain }) {
  return (
    <div className={`search-in-progress  ${searchingAgain ? "searching" : ""}`}>
      <img src="./assets/images/icon-loading.svg" alt="searching" />
      <p>Search in progress</p>
    </div>
  );
}
