import { useState, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TodayWeatherCard from "./components/TodayWeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import "react-loading-skeleton/dist/skeleton.css";

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
  { hour: "2 AM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
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
  { hour: "6 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "5 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "4 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "3 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "2 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
  { hour: "1 PM", temp: "30°", img: "./assets/images/icon-sunny.webp" },
];

const skeletonColors = {
  baseColor: "hsla(240, 22%, 27%, 1.00)",
  baseColor2: "hsla(240, 22%, 36%, 1.00)",
  highlightColor: "hsla(240, 33%, 47%, 1.00)",
};

const imgsObj = {
  sunny: "./assets/images/icon-sunny.webp",
  rainy: "./assets/images/icon-rain.webp",
  snowy: "./assets/images/icon-snow.webp",
  stormy: "./assets/images/icon-storm.webp",
  foggy: "./assets/images/icon-fog.webp",
  overcast: "./assets/images/icon-overcast.webp",
  cloudy: "./assets/images/icon-partly-cloudy.webp",
  drizzle: "./assets/images/icon-drizzle.webp",
};
const weatherCodeMap = {
  0: imgsObj.sunny,
  1: imgsObj.cloudy,
  2: imgsObj.cloudy,
  3: imgsObj.overcast,
  45: imgsObj.foggy,
  48: imgsObj.foggy,
  51: imgsObj.drizzle,
  53: imgsObj.drizzle,
  55: imgsObj.drizzle,
  61: imgsObj.rainy,
  63: imgsObj.rainy,
  65: imgsObj.rainy,
  71: imgsObj.snowy,
  73: imgsObj.snowy,
  75: imgsObj.snowy,
  95: imgsObj.stormy,
  96: imgsObj.stormy,
  99: imgsObj.stormy,
};

const weatherDescriptionMap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export function getWeatherIcon(code) {
  return weatherCodeMap[code] || imgsObj.sunny; // default sunny
}
export function getWeatherDescription(code) {
  return weatherDescriptionMap[code] || "Unknown weather";
}
function formatDate(dateStr, format = "short") {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: format,
  });
}

function App() {
  const [place, setPlace] = useState({});
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(
    new Date().toLocaleDateString("en-US", { weekday: "long" })
  );
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [unitsIsOpen, setUnitIsOpen] = useState(false);
  const [isImperial, setIsImperial] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchingAgain, setSearchingAgain] = useState(false);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );
  const unitSystem = isImperial ? "imperial" : "metric";
  const units =
    unitSystem === "metric"
      ? "&temperature_unit=celsius&apparent_temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm"
      : "&temperature_unit=fahrenheit&apparent_temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch";

  const toggleUnitsMenu = () => {
    setUnitIsOpen(!unitsIsOpen);
  };

  function handleSwitch() {
    setIsImperial(!isImperial);
    setUnitIsOpen(false);
  }

  function handleDaySelect(day) {
    setSelectedDay(day);
    const dayIndex = dailyForecast.findIndex(
      (d) => formatDate(d.day, "short") === day.slice(0, 3)
    );
    setSelectedDayIndex(dayIndex !== -1 ? dayIndex : 0);
    setIsOpen(false);
  }

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

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

    const controller = new AbortController();
    async function fetchWeather() {
      try {
        setIsLoading(true);
        setError(null);

        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=1`,
          { signal: controller.signal }
        );

        if (!geoRes.ok) {
          throw new Error("Geocoding API error");
        }

        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          setError("City not found!");
          setIsLoading(false);
          return;
        }

        const cityName = geoData.results[0].name;

        setSearchHistory((prev) => {
          const updated = [
            cityName,
            ...prev.filter((c) => c !== cityName),
          ].slice(0, 5);
          localStorage.setItem("searchHistory", JSON.stringify(updated));
          return updated;
        });

        setPlace({
          city: geoData.results[0].name,
          country: geoData.results[0].country,
        });

        const { latitude, longitude } = geoData.results[0];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}${units}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&hourly=apparent_temperature,relativehumidity_2m,precipitation,weathercode,windspeed_10m`
        );

        if (!weatherRes.ok) {
          throw new Error("Weather API error");
        }

        const weatherData = await weatherRes.json();
        const curr = weatherData.current_weather;

        const idx = findClosestIndex(weatherData.hourly.time, curr.time);

        setSearchingAgain(false);

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

        setDailyForecast(
          Array.from({ length: 7 }).map((_, i) => ({
            day: weatherData.daily.time[i],
            icon: getWeatherIcon(weatherData.daily.weathercode[i]),
            temp: {
              max: weatherData.daily.temperature_2m_max[i],
              min: weatherData.daily.temperature_2m_min[i],
            },
            description: getWeatherDescription(
              weatherData.daily.weathercode[i]
            ),
          }))
        );

        setWeather(weatherData);
      } catch (error) {
        if (error.message.includes("Geocoding")) {
          setError("Could not fetch location data. Please try again.");
        } else if (error.message.includes("Weather")) {
          setError("Could not fetch weather data. Please try again.");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();

    return () => controller.abort();
  }, [searchCity, units]);

  useEffect(() => {
    if (!weather) return;

    const startIndex = selectedDayIndex * 24;
    const endIndex = startIndex + 24;

    const sliced = weather?.hourly.time
      .slice(startIndex, endIndex)
      .map((t, i) => ({
        hour: new Date(t).toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
        }),
        temp: weather.hourly.temperature_2m[startIndex + i] + "°",
        img: getWeatherIcon(weather.hourly.weathercode[startIndex + i]),
        description: getWeatherDescription(
          weather.hourly.weathercode[startIndex + i]
        ),
      }));

    setHourlyForecast(sliced);
  }, [weather, selectedDayIndex]);

  useEffect(() => {
    if (weather) setSearchingAgain(false);
    if (error) setSearchingAgain(false);
  }, [weather, error]);

  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Header
          isImperial={isImperial}
          handleSwitch={handleSwitch}
          unitsIsOpen={unitsIsOpen}
          toggleMenu={toggleUnitsMenu}
        />
        {error?.includes("Something went wrong") && <SomethingWentWrongMsg />}
        {!error?.includes("Something went wrong") && (
          <HeroSection>
            <h1>How's the sky looking today?</h1>
            <SearchBar
              city={city}
              setCity={setCity}
              searchCity={searchCity}
              setSearchCity={setSearchCity}
              weather={weather}
              searchingAgain={searchingAgain}
              setSearchingAgain={setSearchingAgain}
              error={error}
              searchHistory={searchHistory}
            />
          </HeroSection>
        )}
        {error?.includes("City not found") && <NoResultMsg />}

        {!error && weather && (
          <MainSection>
            <section className="weather-sec">
              <TodayWeatherCard
                place={place}
                weather={weather}
                isLoading={isLoading}
              />
              <WeatherDetails
                weatherDetails={weatherDetails}
                isImperial={isImperial}
                isLoading={isLoading}
              />
              <DailyForecast
                dailyForecast={dailyForecast}
                formatDate={formatDate}
                isLoading={isLoading}
              />
            </section>
            <HourlyForecast
              hourlyForecast={hourlyForecast}
              dailyForecast={dailyForecast}
              selectedDay={selectedDay}
              handleDaySelect={handleDaySelect}
              formatDate={formatDate}
              isOpen={isOpen}
              toggleMenu={toggleMenu}
              selectedDayIndex={selectedDayIndex}
              isLoading={isLoading}
            />
          </MainSection>
        )}
      </SkeletonTheme>
    </>
  );
}

function HeroSection({ children }) {
  return <div className="hero-sec">{children}</div>;
}

function MainSection({ children }) {
  return <main className="weather-container">{children}</main>;
}

function NoResultMsg() {
  return <div className="no-result">No search result found!</div>;
}
function SomethingWentWrongMsg() {
  return (
    <div className="something-wrong">
      <img src="./assets/images/icon-error.svg" alt="something went wrong" />
      <h1>Something went wrong</h1>
      <p>
        We couldn't connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button tabIndex={0} onClick={() => window.location.reload()}>
        <img src="./assets/images/icon-retry.svg" alt="retry" />
        Retry
      </button>
    </div>
  );
}

export default App;
