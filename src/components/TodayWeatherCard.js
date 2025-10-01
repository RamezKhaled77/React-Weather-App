import { ProgressBar } from "react-loader-spinner";
import { getWeatherIcon, getWeatherDescription } from "../App";
export default function TodayWeatherCard({ place, weather, isLoading }) {
  const icon = getWeatherIcon(weather?.current_weather.weathercode);

  const today = new Date();
  const day = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className={`today-weather-card ${isLoading ? "loading" : ""}`}>
      {isLoading || (
        <>
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
        </>
      )}
      {isLoading && (
        <div className="loading-state">
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            barColor="hsl(233, 67%, 56%)"
            borderColor="hsl(28, 100%, 52%)"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
