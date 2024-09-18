import React, { useState } from "react";
import "./styles.scss";
const FieldModules = ({ onDropdownChange }) => {
  const [selected, setSelected] = useState({
    hotel: "",
    module: "",
    submodule: "",
  });

  const handleDropdownChange = (dropdown, value) => {
    // Update the selected state
    setSelected((prevState) => ({
      ...prevState,
      [dropdown]: value,
    }));

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
      hotel: "",
      module: "",
      submodule: "",
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
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hotel:</label>
          <select
            value={selected.hotel}
            onChange={(event) =>
              handleDropdownChange("hotel", event.target.value)
            }
          >
            <option value="">Select Hotel</option>
            <option
              value="Hotel 1"
              disabled={
                selected.hotel === "Hotel 2" || selected.hotel === "Hotel 1"
              }
            >
              Hotel 1
            </option>
            <option
              value="Hotel 2"
              disabled={
                selected.hotel === "Hotel 1" || selected.hotel === "Hotel 2"
              }
            >
              Hotel 2
            </option>
          </select>
        </div>
        <div>
          <label>Modules:</label>
          <select
            value={selected.module}
            onChange={(event) =>
              handleDropdownChange("module", event.target.value)
            }
          >
            <option value="">Select Module</option>
            <option value="Module 1">Module 1</option>
            <option value="Module 2">Module 2</option>
          </select>
        </div>
        <div>
          <label>Submodules:</label>
          <select
            value={selected.submodule}
            onChange={(event) =>
              handleDropdownChange("submodule", event.target.value)
            }
          >
            <option value="">Select Submodule</option>
            <option value="Submodule 1">Submodule 1</option>
            <option value="Submodule 2">Submodule 2</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default FieldModules;
