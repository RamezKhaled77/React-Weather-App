import Skeleton from "react-loading-skeleton";

const skeletonColors = {
  baseColor: "hsla(240, 22%, 27%, 1.00)",
  baseColor2: "hsla(240, 22%, 36%, 1.00)",
  highlightColor: "hsla(240, 33%, 47%, 1.00)",
};

export default function DailyForecast({
  dailyForecast,
  formatDate,
  isLoading,
}) {
  return (
    <ul className="daily-forecast">
      {dailyForecast &&
        !isLoading &&
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
      {(!dailyForecast || isLoading) &&
        Array(7)
          .fill(0)
          .map((_, i) => (
            <li className="forecast-item" key={i}>
              <Skeleton
                baseColor={skeletonColors.baseColor}
                highlightColor={skeletonColors.highlightColor}
                count={1}
                width={65}
                height={30}
              />

              <Skeleton
                baseColor={skeletonColors.baseColor}
                highlightColor={skeletonColors.highlightColor}
                height={50}
                width={50}
                circle
              />
              <div className="temp-range">
                <Skeleton
                  baseColor={skeletonColors.baseColor}
                  highlightColor={skeletonColors.highlightColor}
                  count={1}
                  width={40}
                />

                <Skeleton
                  baseColor={skeletonColors.baseColor}
                  highlightColor={skeletonColors.highlightColor}
                  count={1}
                  width={40}
                />
              </div>
            </li>
          ))}
    </ul>
  );
}
