import Skeleton from "react-loading-skeleton";

const skeletonColors = {
  baseColor: "hsla(240, 22%, 27%, 1.00)",
  baseColor2: "hsla(240, 22%, 36%, 1.00)",
  highlightColor: "hsla(240, 33%, 47%, 1.00)",
};

const detailsData = [
  { label: "Feels Like", value: "30°" },
  { label: "Humidity", value: "22%" },
  { label: "Wind", value: "5 km/h" },
  { label: "Precipitation", value: "0 mm" },
];

export default function WeatherDetails({
  weatherDetails,
  isImperial,
  isLoading,
}) {
  return (
    <ul className="weather-details">
      {(isLoading || !weatherDetails) &&
        detailsData.map((item) => (
          <li className="detail-item" key={item.label}>
            <span className="detail-label">{item.label}</span>
            <Skeleton
              height={35}
              width={110}
              baseColor={skeletonColors.baseColor}
              highlightColor={skeletonColors.highlightColor}
            />
          </li>
        ))}
      {weatherDetails &&
        !isLoading &&
        weatherDetails.map((detail) => (
          <li className="detail-item" key={detail.label}>
            <span className="detail-label">{detail.label}</span>
            <span className="detail-value">
              {detail.value}
              {isImperial ? detail.units[0].imperial : detail.units[0].metric}
            </span>
          </li>
        ))}
    </ul>
  );
}
