import React, { useState } from "react";
import "./styles.scss";
import { configFields } from "../../core/config";

const FieldModules = ({ onDropdownChange }) => {
  const [data, setData] = useState(configFields); 
  const [selected, setSelected] = useState({
    hotel: "",
    module: "",
    submodule: "",
  });

  const handleDropdownChange = (dropdown, value) => {
    setSelected((prevState) => ({
      ...prevState,
      [dropdown]: value,
    }));

    if (value) {
      let displayValue = value;
      if (dropdown === "hotel") {
        const selectedHotel = data[0].hotels.find((h) => h.name === value);
        if (selectedHotel) {
          displayValue = `${selectedHotel.hotelId} (${selectedHotel.name})`;
        }
      }
      onDropdownChange(
        `${dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}: ${displayValue}`
      );
    }
  };

  const availableHotels = data[0].hotels;
  const selectedHotel = availableHotels.find((h) => h.name === selected.hotel);
  const availableModules = selectedHotel ? data[0].modules : [];
  const availableSubmodules = selected.module ? data[0].submodules : [];

  return (
    <div className="field-modules">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="dropdown-container">
          <label>Hotel:</label>
          <select
            value={selected.hotel}
            onChange={(event) => handleDropdownChange("hotel", event.target.value)}
          >
            <option value="" className="dropdown-label">
              Select Hotel
            </option>
            {availableHotels.map((h) => (
              <option key={h.hotelId} value={h.name}>
                {h.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Modules:</label>
          <select
            value={selected.module}
            onChange={(event) => handleDropdownChange("module", event.target.value)}
            disabled={!selected.hotel}
          >
            <option value="">Select Module</option>
            {availableModules.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Submodules:</label>
          <select
            value={selected.submodule}
            onChange={(event) => handleDropdownChange("submodule", event.target.value)}
            disabled={!selected.module}
          >
            <option value="">Select Submodule</option>
            {availableSubmodules.map((submod) => (
              <option key={submod} value={submod}>
                {submod}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default FieldModules;
