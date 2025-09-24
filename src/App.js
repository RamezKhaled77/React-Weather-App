import { useState, useEffect } from "react";
import DropdownMenu from "./components/DropdownMenu";

function App() {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchCity) return;

    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);

        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=1`
        );
        const geoData = await geoRes.json();
        console.log(geoData);

        if (!geoData.results) {
          setError("City not found!");
          setLoading(false);
          return;
        }

        const { latitude, longitude } = geoData.results[0];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherRes.json();
        console.log(weatherData);

        setWeather(weatherData.current_weather);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [searchCity]);

  return (
    <>
      <Header />
      <HeroSection>
        <h1>How's the sky looking today?</h1>
        <SearchBar
          city={city}
          setCity={setCity}
          setSearchCity={setSearchCity}
        />
      </HeroSection>
    </>
  );
}

function Header() {
  return (
    <header>
      <img className="logo" src="./assets/images/logo.svg" alt="" />

      <DropdownMenu />
    </header>
  );
}

function HeroSection({ children }) {
  return <div className="hero-sec">{children}</div>;
}

function SearchBar({ city, setCity, setSearchCity }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim() !== "") {
      setSearchCity(city);
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <img
        className="search-icon"
        src="./assets/images/icon-search.svg"
        alt="search"
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
    </form>
  );
}

export default App;
