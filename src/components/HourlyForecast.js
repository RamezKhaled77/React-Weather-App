import Skeleton from "react-loading-skeleton";
import { DaysDropdownMenu, DropdownItem } from "./DaysDropdownMenu";

const skeletonColors = {
  baseColor: "hsla(240, 22%, 27%, 1.00)",
  baseColor2: "hsla(240, 22%, 36%, 1.00)",
  highlightColor: "hsla(240, 33%, 47%, 1.00)",
};

export default function HourlyForecast({
  hourlyForecast,
  dailyForecast,
  selectedDay,
  handleDaySelect,
  formatDate,
  isOpen,
  toggleMenu,
  isLoading,
}) {
  return (
    <aside>
      <div className="head">
        <h5>Hourly Forecast</h5>

        <DaysDropdownMenu
          isLoading={isLoading}
          selectedDay={selectedDay}
          isOpen={isOpen}
          toggleMenu={toggleMenu}
        >
          {dailyForecast?.map((day) => (
            <DropdownItem
              isLoading={isLoading}
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
          !isLoading &&
          hourlyForecast.map((hour) => (
            <li key={hour.hour}>
              <div>
                <img src={hour.img} alt={hour.description} />
                <span className="hour">{hour.hour}</span>
              </div>
              <span className="temp">{hour.temp}</span>
            </li>
          ))}
        {(!hourlyForecast || isLoading) &&
          Array(23)
            .fill(0)
            .map((_, i) => (
              <li key={i}>
                <div>
                  <Skeleton
                    style={{ margin: "10px 15px" }}
                    height={40}
                    width={40}
                    baseColor={skeletonColors.baseColor2}
                    highlightColor={skeletonColors.highlightColor}
                    circle
                  />
                  <Skeleton
                    baseColor={skeletonColors.baseColor2}
                    highlightColor={skeletonColors.highlightColor}
                    count={1}
                    width={50}
                  />
                </div>
                <Skeleton
                  baseColor={skeletonColors.baseColor2}
                  highlightColor={skeletonColors.highlightColor}
                  count={1}
                  width={40}
                  height={25}
                />
              </li>
            ))}
      </ul>
    </aside>
  );
}
