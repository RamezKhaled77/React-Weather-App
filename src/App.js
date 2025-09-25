import { useState, useEffect } from "react";
import DropdownMenu from "./components/DropdownMenu";

const detailsData = [
  { label: "Feels Like", value: "30°" },
  { label: "Humidity", value: "22%" },
  { label: "Wind", value: "5 km/h" },
  { label: "Precipitation", value: "0 mm" },
];

const DailyForecastData = [
  {
    day: "Sat",
    icon: "./assets/images/icon-fog.webp",
    temp: {
      max: "30°",
      min: "20°",
    },
  },
  {
    day: "Sun",
    icon: "./assets/images/icon-sunny.webp",
    temp: {
      max: "30°",
      min: "20°",
    },
  },
  {
    day: "Mon",
    icon: "./assets/images/icon-snow.webp",
    temp: {
      max: "30°",
      min: "20°",
    },
  },
  {
    day: "Tue",
    icon: "./assets/images/icon-storm.webp",
    temp: {
      max: "30°",
      min: "20°",
    },
  },
  {
    day: "Wed",
    icon: "./assets/images/icon-rain.webp",
    temp: {
      max: "30°",
      min: "20°",
    },
  },
  {
    day: "Thu",
    icon: "./assets/images/icon-partly-cloudy.webp",
    temp: {
      max: "30°",
      min: "20°",
    },
  },
  {
    day: "Fri",
    icon: "./assets/images/icon-overcast.webp",
    temp: {
      max: "30°",
      min: "20°",
    },
  },
];

const hoursTemp = [
  { hour: "7 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "8 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "9 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "10 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "11 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "12 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "1 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "3 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "4 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "5 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "6 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "7 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "8 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "9 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "10 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "11 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "12 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
];

function App() {
  const [place, setPlace] = useState({});
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function findClosestIndex(times, targetTime) {
    const target = new Date(targetTime).getTime();

    let closestIndex = 0;
    let minDiff = Infinity;

    times.forEach((time, i) => {
      const diff = Math.abs(new Date(time).getTime() - target);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    });

    return closestIndex;
  }

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

        setPlace({
          city: geoData.results[0].name,
          country: geoData.results[0].country,
        });

        if (!geoData.results) {
          setError("City not found!");
          setLoading(false);
          return;
        }

        const { latitude, longitude } = geoData.results[0];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=apparent_temperature,relativehumidity_2m,precipitation,weathercode,windspeed_10m`
        );
        const weatherData = await weatherRes.json();
        const curr = weatherData.current_weather;

        const idx = findClosestIndex(weatherData.hourly.time, curr.time);

        setWeatherDetails([
          {
            label: "Feels Like",
            value: weatherData.hourly.apparent_temperature[idx],
            units: [{ metric: " °C", imperial: " °F" }],
          },
          {
            label: "Humidity",
            value: weatherData.hourly.relativehumidity_2m[idx],
            units: [{ metric: " %", imperial: " %" }],
          },
          {
            label: "Wind",
            value: curr.windspeed,
            units: [{ metric: " km/h", imperial: " mph" }],
          },
          {
            label: "Precipitation",
            value: weatherData.hourly.precipitation[idx],
            units: [{ metric: " mm", imperial: " in" }],
          },
        ]);

        console.log("1st", weatherData);
        console.log("2nd", curr);
        console.log("3rd", idx);

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
      <MainSection>
        <section className="weather-sec">
          <TodayWeatherCard place={place} weather={weather} />
          <WeatherDetails weatherDetails={weatherDetails} />
          <DailyForecast />
        </section>
        <HourlyForecast />
      </MainSection>
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

function MainSection({ children }) {
  return <main className="weather-container">{children}</main>;
}

function TodayWeatherCard({ place, weather }) {
  const today = new Date();
  const day = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (weather) console.log("inside", weather.temperature);
  return (
    <div className="today-weather-card">
      <div className="left-div">
        <h4>
          {place.country}, {place.city}
        </h4>
        <p>{day}</p>
      </div>
      <div className="right-div">
        <img src="./assets/images/icon-sunny.webp" alt="sunny" />
        <span>{weather?.temperature}°</span>
      </div>
    </div>
  );
}

function WeatherDetails({ weatherDetails }) {
  console.log(weatherDetails);
  return (
    <ul className="weather-details">
      {weatherDetails &&
        weatherDetails.map((detail) => (
          <li className="detail-item" key={detail.label}>
            <span className="detail-label">
              {detail.label}
              {detail.units.metric}
            </span>
            <span className="detail-value">
              {detail.value}
              {detail.units[0].metric}
            </span>
          </li>
        ))}
    </ul>
  );
}
function DailyForecast() {
  return (
    <ul className="daily-forecast">
      {DailyForecastData.map((day) => (
        <li className="forecast-item" key={day.day}>
          <span className="forecast-day">{day.day}</span>
          <img src={day.icon} alt={day.day} />
          <div className="temp-range">
            <span className="forecast-temp">{day.temp.max}</span>
            <span className="forecast-temp">{day.temp.min}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function HourlyForecast() {
  return (
    <aside>
      <div className="head">
        <h5>Hourly Forecast</h5>
        <span>Friday</span>
      </div>
      <ul className="hours-list">
        {hoursTemp.map((hour) => (
          <li key={hour.hour}>
            <div>
              <img src={hour.img} alt={hour.hour} />
              <span className="hour">{hour.hour}</span>
            </div>
            <span className="temp">{hour.temp}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default App;
