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

export function DaysDropdownMenu({
  children,
  selectedDay,
  isOpen,
  toggleMenu,
  isLoading,
}) {
  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleMenu}>
        {isLoading ? "-" : selectedDay}
        <img src="./assets/images/icon-dropdown.svg" alt="units dropdown" />
      </button>

      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>{children}</ul>
    </div>
  );
}

export function DropdownItem({ day, selected, onClick }) {
  //   console.log("from dropdown", selected);
  return (
    <li
      className={`dropdown-item ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {day}
    </li>
  );
}
