import React, { useState } from "react";
import Select from "react-select"; // Keep this import for submodules
import FieldSelected from "./fieldSelected";
import { configFields } from "../../core/config";
import "./styles.scss";

const customStyles = {
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    border: "1px solid #ccc",
    "&:hover": {
      border: "1px solid #aaa",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#e0e0e0",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#333",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#d9534f",
    ":hover": {
      backgroundColor: "#d9534f",
      color: "white",
    },
  }),
};
import "./styles.scss"; // Import the styles

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);
  const [selectedKeyValuePair, setSelectedKeyValuePair] = useState({
    key: null,
    value: null,
  }); // Combined state

  const handleDropdownChange = (hotel, module, submodules, keyValuePair) => {
    const hotelId = hotel.hotelId;
    const existingHotel = data.find((h) => h.hotelId === hotelId);

    if (existingHotel) {
      const updatedHotels = data.map((h) => {
        if (h.hotelId === hotelId) {
          const moduleExists = h.modules.find(
            (mod) => mod.name === module.name
          );

          const uniqueSubmodules = [
            ...new Set([
              ...h.modules
                .find((mod) => mod.name === module.name)
                ?.submodules.map((sub) => sub.name),
              ...submodules.map((sub) => sub.name),
            ]),
          ];

          // Create a new object for keys and values
          const updatedKeyValues = { ...h.keyValuePairs };
          updatedKeyValues[keyValuePair.key] = keyValuePair.value;

          if (moduleExists) {
            const updatedModules = h.modules.map((mod) => {
              if (mod.name === module.name) {
                return {
                  ...mod,
                  submodules: uniqueSubmodules.map((name) => ({ name })),
                };
              }
              return mod;
            });
            return {
              ...h,
              modules: updatedModules,
              keyValuePairs: updatedKeyValues,
            };
          } else {
            return {
              ...h,
              modules: [
                ...h.modules,
                {
                  name: module.name,
                  submodules: submodules.map((sub) => ({ name: sub.name })),
                },
              ],
              keyValuePairs: updatedKeyValues,
            };
          }
        }
        return h;
      });
      setData(updatedHotels);
    } else {
      const keyValuePairs = {
        [keyValuePair.key]: keyValuePair.value,
      };

      setData([
        ...data,
        {
          hotelId: hotel.hotelId,
          name: hotel.name,
          modules: [
            {
              name: module.name,
              submodules: submodules.map((sub) => ({ name: sub.name })),
            },
          ],
          keyValuePairs: keyValuePairs, // Use the new object structure
        },
      ]);
    }
  };

  const handleHotelSelect = (e) => {
    const selected = configFields[0].hotels.find(
      (hotel) => hotel.hotelId === e.target.value
    );
    setSelectedHotel(selected);
  };

  const handleModuleSelect = (e) => {
    setSelectedModule({ name: e.target.value });
  };

  const handleKeySelect = (e) => {
    setSelectedKeyValuePair((prev) => ({
      ...prev,
      key: e.target.value, // Update key
    }));
  };

  const handleKeyValueSelect = (e) => {
    setSelectedKeyValuePair((prev) => ({
      ...prev,
      value: e.target.value, // Update value
    }));
  };

  const handleSubmoduleSelect = (selectedOptions) => {
    setSelectedSubmodules(
      selectedOptions
        ? selectedOptions.map((option) => ({ name: option.value }))
        : []
    );
  };

  const addSelection = () => {
    if (
      selectedHotel &&
      selectedModule &&
      selectedSubmodules.length > 0 &&
      selectedKeyValuePair.key &&
      selectedKeyValuePair.value
    ) {
      handleDropdownChange(
        selectedHotel,
        selectedModule,
        selectedSubmodules,
        selectedKeyValuePair // Pass the combined object
      );
      setSelectedModule(null);
      setSelectedSubmodules([]);
      setSelectedKeyValuePair({ key: null, value: null }); // Reset to initial state
    }
  };

  console.log(data);
  return (
    <div className="field-modules-container">
      <div className="field-modules">
        <h3>Select Hotel, Module, and Submodules</h3>
        <div className="dropdown-container">
          <label>Hotel:</label>
          <select
            value={selectedHotel ? selectedHotel.hotelId : ""}
            onChange={handleHotelSelect}
          >
            <option value="" disabled>
              Select Hotel
            </option>
          <select
            value={selectedHotel.hotelId || ""}
            onChange={handleHotelSelect}
          >
            <option value="" disabled>
              Select Hotel
            </option>
            {configFields[0].hotels.map((hotel) => (
              <option key={hotel.hotelId} value={hotel.hotelId}>
                {hotel.name}
              </option>
              <option key={hotel.hotelId} value={hotel.hotelId}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

        {selectedHotel && (
          <>
            <div className="dropdown-container">
              <label>Module:</label>
              <select
                value={selectedModule ? selectedModule.name : ""}
                onChange={handleModuleSelect}
              >
                <option value="" disabled>
                  Select Module
                </option>
              <select
                value={selectedModule.name || ""}
                onChange={handleModuleSelect}
              >
                <option value="" disabled>
                  Select Module
                </option>
                {configFields[0].modules.map((module, index) => (
                  <option key={index} value={module}>
                    {module}
                  </option>
                  <option key={index} value={module}>
                    {module}
                  </option>
                ))}
              </select>
            </div>

            {selectedModule && (
              <div className="dropdown-container">
                <label>Submodules:</label>
                <Select
                  isMulti
                  options={configFields[0].submodules.map((submodule) => ({
                    value: submodule,
                    label: submodule,
                  }))}
                  value={selectedSubmodules.map((submodule) => ({
                    value: submodule.name,
                    label: submodule.name,
                  }))}
                  options={configFields[0].submodules.map((submodule) => ({
                    value: submodule,
                    label: submodule,
                  }))}
                  value={selectedSubmodules.map((submodule) => ({
                    value: submodule.name,
                    label: submodule.name,
                  }))}
                  onChange={handleSubmoduleSelect}
                  styles={customStyles}
                />
              </div>
            )}

            <div className="dropdown-container">
              <label>Keys:</label>
              <select
                value={selectedKeyValuePair.key || ""}
                onChange={handleKeySelect}
              >
                <option value="" disabled>
                  Select Key
                </option>
                {configFields[0].keys.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <div className="dropdown-container">
              <label>Values:</label>
              <select
                value={selectedKeyValuePair.value || ""}
                onChange={handleKeyValueSelect}
              >
                <option value="" disabled>
                  Select Value
                </option>
                {configFields[0].values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={addSelection}>Add Selection</button>
          </>
        )}
      </div>

      <div className="selected-data-container">
        {data.length > 0 ? (
            {data.length > 0 && <FieldSelected data={data} setData={setData}/>}
      
        ) : (
          <p>No data selected yet.</p>
        )}
      </div>
    </div>
  );
};

export default FieldModules;

