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

  const handleDropdownChange = (dropdown, value) => {
    setSelected((prevState) => ({
      ...prevState,
      [dropdown]: value,
    }));

    if (value) {

      onDropdownChange(value);
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
      onDropdownChange(value);
    }
  

  const addHotel = (hotelName) => {
    if (hotelName && !data.hotels.find((h) => h.name === hotelName)) {
      setData((prevData) => {
        const newData = {
          ...prevData,
          hotels: [...prevData.hotels, { name: hotelName, modules: [] }],
        };
        console.log(newData);
        return newData;
      });
    }
  };

  const addModule = (moduleName) => {
    const { hotel } = selected;
    if (hotel && moduleName) {
      const hotelData = data.hotels.find((h) => h.name === hotel);
      if (hotelData && !hotelData.modules.find((m) => m.name === moduleName)) {
        setData((prevData) => {
          const updatedHotels = prevData.hotels.map((h) => {
            if (h.name === hotel) {
              return {
                ...h,
                modules: [...h.modules, { name: moduleName, submodules: [] }],
              };
            }
            return h;
          });
          const newData = { ...prevData, hotels: updatedHotels };
          console.log(newData);
          return newData;
        });
        handleDropdownChange("module", moduleName);
      }
    }
  };

  const addSubmodule = (submoduleName) => {
    const { hotel, module } = selected;
    if (hotel && module && submoduleName) {
      const hotelData = data.hotels.find((h) => h.name === hotel);
      const moduleData = hotelData?.modules.find((m) => m.name === module);
      if (moduleData && !moduleData.submodules.includes(submoduleName)) {
        setData((prevData) => {
          const updatedHotels = prevData.hotels.map((h) => {
            if (h.name === hotel) {
              const updatedModules = h.modules.map((m) => {
                if (m.name === module) {
                  return {
                    ...m,
                    submodules: [...m.submodules, submoduleName],
                  };
                }
                return m;
              });
              return { ...h, modules: updatedModules };
            }
            return h;
          });
          const newData = { ...prevData, hotels: updatedHotels };
          console.log(newData);
          return newData;
        });
      } else {
        console.log("Submodule already exists!");
      }
    }
  };

  const availableHotels = ["Hotel A", "Hotel B", "Hotel C"];
  const selectedHotels = data.hotels.map((h) => h.name);
  const availableModules = selected.hotel
    ? ["Module 1", "Module 2", "Module 3"].filter(
        (m) =>
          !data.hotels
            .find((h) => h.name === selected.hotel)
            ?.modules.find((mod) => mod.name === m)
      )
    : [];

  const availableSubmodules = ["Submodule A", "Submodule B", "Submodule C"];

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
            value={selected.hotel}
            onChange={(event) => {
              const value = event.target.value;
              handleDropdownChange("hotel", value);
              addHotel(value);
            }}
            disabled={!!selected.hotel}
          >
            <option value="" className="dropdown-label">
              Select Hotel
            </option>
            {availableHotels
              .filter((h) => !selectedHotels.includes(h))
              .map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Modules:</label>
          <select
            value={selected.module}
            onChange={(event) => {
              const value = event.target.value;
              handleDropdownChange("module", value);
              addModule(value);
            }}
            disabled={!selected.hotel || availableModules.length === 0}
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
            onChange={(event) => {
              const value = event.target.value;
              handleDropdownChange("submodule", value);
              addSubmodule(value);
            }}
            disabled={!selected.module} // Enable only if a module is selected
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


export default FieldModules;
