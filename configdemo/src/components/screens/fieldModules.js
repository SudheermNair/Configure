import React, { useState } from "react";
import "./styles.scss";

const initialData = {
  hotels: [],
};

const FieldModules = ({ onDropdownChange }) => {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState({
    hotel: "",
    module: "",
    submodule: "",
  });
  const [moduleEnabled, setModuleEnabled] = useState(false);

  const handleDropdownChange = (dropdown, value) => {
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

  const addHotel = (hotelName) => {
    setData((prevData) => {
      if (!prevData.hotels.find((h) => h.name === hotelName)) {
        return {
          ...prevData,
          hotels: [...prevData.hotels, { name: hotelName, modules: [] }],
        };
      }
      return prevData;
    });
  };

  const enableModuleSelection = () => {
    setModuleEnabled(true);
  };

  const addModule = (moduleName) => {
    const { hotel } = selected;
    if (hotel && moduleName) {
      setData((prevData) => {
        const updatedHotels = prevData.hotels.map((h) => {
          if (h.name === hotel) {
            if (!h.modules.find((m) => m.name === moduleName)) {
              return {
                ...h,
                modules: [...h.modules, { name: moduleName, submodules: [] }],
              };
            }
          }
          return h;
        });
        return { ...prevData, hotels: updatedHotels };
      });
      handleDropdownChange("module", ""); // Reset module selection after adding
      setModuleEnabled(false); // Disable module selection after adding
    }
  };

  const addSubmodule = (submoduleName) => {
    const { hotel, module } = selected;
    if (hotel && module) {
      setData((prevData) => {
        const updatedHotels = prevData.hotels.map((h) => {
          if (h.name === hotel) {
            const updatedModules = h.modules.map((m) => {
              if (m.name === module) {
                if (!m.submodules.includes(submoduleName)) {
                  return {
                    ...m,
                    submodules: [...m.submodules, submoduleName],
                  };
                }
              }
              return m;
            });
            return { ...h, modules: updatedModules };
          }
          return h;
        });
        return { ...prevData, hotels: updatedHotels };
      });
    }
  };

  const { hotel, module } = selected;

  return (
    <div className="field-modules">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="dropdown-container">
          <label>Hotel:</label>
          <select
            value={hotel}
            onChange={(event) => {
              const value = event.target.value;
              handleDropdownChange("hotel", value);
              addHotel(value);
            }}
            disabled={!!hotel}
          >
            <option value="" className="dropdown-label">
              Select Hotel
            </option>
            <option value="Hotel A">Hotel A</option>
            <option value="Hotel B">Hotel B</option>
          </select>
        </div>
        <div>
          <label>Modules:</label>
          <select
            value={module}
            onChange={(event) => {
              const value = event.target.value;
              handleDropdownChange("module", value);
              setModuleEnabled(false); // Disable the module dropdown after selection
            }}
            disabled={!moduleEnabled}
          >
            <option value="">Select Module</option>
            <option value="Module 1">Module 1</option>
            <option value="Module 2">Module 2</option>
            <option value="Module 3">Module 3</option>
          </select>
          <button
            type="button"
            onClick={() => {
              enableModuleSelection();
              handleDropdownChange("module", ""); // Reset module selection
            }}
            disabled={!hotel}
          >
            Add Module
          </button>
        </div>
        <div>
          <label>Submodules:</label>
          <select
            value={selected.submodule}
            onChange={(event) => {
              const value = event.target.value;
              handleDropdownChange("submodule", value);
              addSubmodule(value);
            }}
            disabled={!module}
          >
            <option value="">Select Submodule</option>
            <option value="Submodule A">Submodule A</option>
            <option value="Submodule B">Submodule B</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default FieldModules;
