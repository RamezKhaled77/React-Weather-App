import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import UnitsDropdownMenu from "./components/UnitsDropdownMenu";
import { DaysDropdownMenu, DropdownItem } from "./components/DaysDropdownMenu";
import "react-loading-skeleton/dist/skeleton.css";

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

function getWeatherIcon(code) {
  return weatherCodeMap[code] || imgsObj.sunny; // default sunny
}
function getWeatherDescription(code) {
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
  const unitSystem = isImperial ? "imperial" : "metric";
  const units =
    unitSystem === "metric"
      ? "&temperature_unit=celsius&apparent_temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm"
      : "&temperature_unit=fahrenheit&apparent_temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch";

  console.log("unitSystem", unitSystem);
  const toggleUnitsMenu = () => {
    setUnitIsOpen(!unitsIsOpen);
  };

  function handleSwitch() {
    setIsImperial(!isImperial);
    setUnitIsOpen(false);
  }

  function handleDaySelect(day) {
    console.log(dailyForecast);
    console.log("day =>", day);
    setSelectedDay(day);
    const dayIndex = dailyForecast.findIndex(
      (d) => formatDate(d.day, "short") === day.slice(0, 3)
    );
    setSelectedDayIndex(dayIndex !== -1 ? dayIndex : 0);
    console.log("=========>", dayIndex);
    setIsOpen(false);
  }

  const [isOpen, setIsOpen] = useState(false);

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

    async function fetchWeather() {
      try {
        setIsLoading(true);
        setError(null);

        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=1`
        );
        const geoData = await geoRes.json();
        // console.log("geoData", geoData);

        setPlace({
          city: geoData.results[0].name,
          country: geoData.results[0].country,
        });

        if (!geoData.results) {
          setError("City not found!");
          setIsLoading(false);
          return;
        }

        const { latitude, longitude } = geoData.results[0];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}${units}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&hourly=apparent_temperature,relativehumidity_2m,precipitation,weathercode,windspeed_10m`
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

        // setHourlyForecast(
        //   Array.from({ length: 24 }).map((_, i) => ({
        //     hour: new Date(weatherData.hourly.time[i]).toLocaleTimeString(
        //       "en-US",
        //       {
        //         hour: "numeric",
        //         hour12: true,
        //       }
        //     ),
        //     temp: weatherData.hourly.temperature_2m[i] + "°",
        //     img: getWeatherIcon(weatherData.hourly.weathercode[i]),
        //     description: getWeatherDescription(
        //       weatherData.hourly.weathercode[i]
        //     ),
        //   }))
        // );

        // console.log("1st", weatherData);
        // console.log("2nd", curr);
        // console.log("3rd", idx);
        console.log("4th", weatherData.daily);
        console.log("5th", weatherData.hourly);

        setWeather(weatherData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
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

  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Header
          isImperial={isImperial}
          handleSwitch={handleSwitch}
          unitsIsOpen={unitsIsOpen}
          toggleMenu={toggleUnitsMenu}
        />
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
            <WeatherDetails
              weatherDetails={weatherDetails}
              isImperial={isImperial}
            />
            <DailyForecast
              dailyForecast={dailyForecast}
              formatDate={formatDate}
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
          />
        </MainSection>
      </SkeletonTheme>
    </>
  );
}

function Header({ isImperial, handleSwitch, unitsIsOpen, toggleMenu }) {
  return (
    <header>
      <img className="logo" src="./assets/images/logo.svg" alt="" />

      <UnitsDropdownMenu
        isImperial={isImperial}
        handleSwitch={handleSwitch}
        toggleMenu={toggleMenu}
        unitsIsOpen={unitsIsOpen}
      />
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
  const icon = getWeatherIcon(weather?.current_weather.weathercode);
  // if (weather) console.log("icon", icon, weather.current_weather.weathercode);
  // if (weather)
  //   console.log(getWeatherDescription(weather.current_weather.weathercode));

  const today = new Date();
  const day = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  // if (weather) console.log("inside", weather.current_weather.temperature);
  return (
    <div className="today-weather-card">
      <div className="left-div">
        <h4>
          {place.country}, {place.city}
        </h4>
        <p>{day}</p>
      </div>
      <div className="right-div">
        <img
          src={icon}
          alt={getWeatherDescription(weather?.current_weather.weathercode)}
        />
        <span>{weather?.current_weather.temperature}°</span>
      </div>
    </div>
  );
}

function WeatherDetails({ weatherDetails, isImperial }) {
  // if (weatherDetails) console.log(weatherDetails[0].units.metric);
  return (
    <ul className="weather-details">
      {weatherDetails &&
        weatherDetails.map((detail) => (
          <li className="detail-item" key={detail.label}>
            <span className="detail-label">
              {detail.label}
              {/* {detail.units.metric} */}
            </span>
            <span className="detail-value">
              {detail.value}
              {isImperial ? detail.units[0].imperial : detail.units[0].metric}
            </span>
          </li>
        ))}
    </ul>
  );
}
function DailyForecast({ dailyForecast, formatDate }) {
  // console.log(formatDate("2023-10-05"));
  // if (dailyForecast) console.log(typeof dailyForecast, dailyForecast);

  return (
    <ul className="daily-forecast">
      {dailyForecast &&
        dailyForecast.map((day) => (
          <li className="forecast-item" key={day.day}>
            <span className="forecast-day">{formatDate(day.day)}</span>
            <img src={day.icon} alt={day.day} />
            <div className="temp-range">
              <span className="forecast-temp">{day.temp.max}°</span>
              <span className="forecast-temp">{day.temp.min}°</span>
            </div>
          </li>
        ))}
    </ul>
  );
}

function HourlyForecast({
  hourlyForecast,
  dailyForecast,
  selectedDay,
  handleDaySelect,
  formatDate,
  isOpen,
  toggleMenu,
}) {
  // if (hourlyForecast) console.log(typeof hourlyForecast, hourlyForecast);
  return (
    <aside>
      <div className="head">
        <h5>Hourly Forecast</h5>

        <DaysDropdownMenu
          selectedDay={selectedDay}
          isOpen={isOpen}
          toggleMenu={toggleMenu}
        >
          {dailyForecast?.map((day) => (
            <DropdownItem
              key={day.day}
              day={formatDate(day.day, "long")}
              selected={formatDate(day.day, "long") === selectedDay}
              onClick={() => handleDaySelect(formatDate(day.day, "long"))}
            />
          ))}
        </DaysDropdownMenu>
      </div>
      <ul className="hours-list">
        {hourlyForecast &&
          hourlyForecast.map((hour) => (
            <li key={hour.hour}>
              <div>
                <img src={hour.img} alt={hour.description} />
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
