import React, { useState } from "react";
import "./addConfig.scss";
import { hotelOptions } from "../../core/KeyOptions";
import { moduleOptions } from "../../core/KeyOptions";

const AddConfig = ({ onDropdownChange }) => {
  const [selected, setSelected] = useState({
    key: "",
    value: "",
  });

  const handleDropdownChange = (dropdown, value) => {
    // Update the selected state
    setSelected((prevState) => ({
      ...prevState,
      [dropdown]: value,
    }));

    // Notify parent component about the change
    if (value) {
      onDropdownChange(
        `${dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}: ${value}`
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset the selected state
    setSelected({
      key: "",
      value: "",
    });

    // Notify parent component about the selected options
    Object.entries(selected).forEach(([dropdown, value]) => {
      if (value) {
        onDropdownChange(
          `${dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}: ${value}`
        );
      }
    });
  };

  return (
    <div className="field-modules">
      <h1>Configuration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Key:</label>
          <select
            value={selected.hotel}
            onChange={(event) =>
              handleDropdownChange("hotel", event.target.value)
            }
          >
            <option value="">Select Key</option>
            {hotelOptions.map((hotel) => (
              <option
                key={hotel}
                value={hotel}
                disabled={selected.hotel === hotel}
              >
                {hotel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Values:</label>
          <select
            value={selected.hotel}
            onChange={(event) =>
              handleDropdownChange("hotel", event.target.value)
            }
          >
            <option value="">Select Value</option>
            {moduleOptions.map((hotel) => (
              <option
                key={hotel}
                value={hotel}
                disabled={selected.hotel === hotel}
              >
                {hotel}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default AddConfig;
