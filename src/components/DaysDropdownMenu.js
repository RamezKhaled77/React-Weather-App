import { useState } from "react";

const weekendDays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

function DaysDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Friday");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleMenu}>
        Today
        <img src="./assets/images/icon-dropdown.svg" alt="units dropdown" />
      </button>

      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        {weekendDays.map((day) => (
          <DropdownItem
            key={day}
            day={day}
            selected={day === selectedDay}
            onClick={() => handleDaySelect(day)}
          />
        ))}
      </ul>
    </div>
  );
}

function DropdownItem({ day, selected, onClick }) {
  return (
    <li
      className={`dropdown-item ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {day}
    </li>
  );
}

export default DaysDropdownMenu;
