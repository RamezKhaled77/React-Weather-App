// src/components/DropdownMenu.jsx

const units = [
  {
    secLabel: "Temperature",
    metricVal: "Celsius (°C)",
    imperialVal: "Fahrenheit (°F)",
  },
  { secLabel: "Wind Speed", metricVal: "Km/h", imperialVal: "Mph" },
  {
    secLabel: "Precipitation",
    metricVal: "Millimeters (mm)",
    imperialVal: "Inches (in)",
  },
];

function UnitsDropdownMenu({
  isImperial,
  handleSwitch,
  toggleMenu,
  unitsIsOpen,
}) {
  return (
    <div className="dropdown-container">
      <button tabIndex={0} className="dropdown-button" onClick={toggleMenu}>
        <img src="./assets/images/icon-units.svg" alt="units" />
        Units
        <img src="./assets/images/icon-dropdown.svg" alt="units dropdown" />
      </button>

      <div className={`dropdown-menu ${unitsIsOpen ? "show" : ""}`}>
        <button
          tabIndex={0}
          className="switch-imperial"
          value="imperial"
          onClick={handleSwitch}
        >
          Switch to {!isImperial ? "Metric" : "Imperial"}
        </button>

        {units.map((unit) => (
          <DropdownSection
            key={unit.secLabel}
            secLabel={unit.secLabel}
            metricVal={unit.metricVal}
            imperialVal={unit.imperialVal}
            isImperial={isImperial}
          />
        ))}

        {/* <div className="dropdown-section">
          <h6 className="dropdown-label">Temperature</h6>
          <div className="dropdown-item selected">
            Celsius (°C)
            <img src="./assets/images/icon-checkmark.svg" alt="selected" />
          </div>
          <div className="dropdown-item">Fahrenheit (°F)</div>
        </div>

        <div className="dropdown-section">
          <h6 className="dropdown-label">Wind Speed</h6>
          <div className="dropdown-item selected">
            km/h
            <img src="./assets/images/icon-checkmark.svg" alt="selected" />
          </div>
          <div className="dropdown-item">mph</div>
        </div>

        <div className="dropdown-section">
          <h6 className="dropdown-label">Precipitation</h6>
          <div className="dropdown-item selected">
            Millimeters (mm)
            <img src="./assets/images/icon-checkmark.svg" alt="selected" />
          </div>
          <div className="dropdown-item">Inches (in)</div>
        </div> */}
      </div>
    </div>
  );
}

function DropdownSection({ secLabel, metricVal, imperialVal, isImperial }) {
  return (
    <div className="dropdown-section">
      <h6 className="dropdown-label">{secLabel}</h6>
      <div className={`dropdown-item ${isImperial ? "selected" : ""}`}>
        {metricVal}
        {isImperial && (
          <img src="./assets/images/icon-checkmark.svg" alt="selected" />
        )}
      </div>
      <div className={`dropdown-item ${!isImperial ? "selected" : ""}`}>
        {imperialVal}
        {!isImperial && (
          <img src="./assets/images/icon-checkmark.svg" alt="selected" />
        )}
      </div>
    </div>
  );
}

export default UnitsDropdownMenu;
