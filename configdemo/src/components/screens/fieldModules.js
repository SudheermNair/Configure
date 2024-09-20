import React, { useState } from "react";
import Select from "react-select";
import FieldSelected from "./fieldSelected"; 
import { configFields } from "../../core/config";

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

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedKeyValue, setSelectedKeyValue] = useState("");

  const handleHotelSelect = (e) => {
    const selected = configFields[0].hotels.find(
      (hotel) => hotel.hotelId === e.target.value
    );
    setSelectedHotel(selected);
  };

  const handleModuleSelect = (e) => {
    const moduleName = e.target.value;
    setSelectedModule({ name: moduleName });

    if (selectedHotel) {
      const existingHotel = data.find(
        (h) => h.hotelId === selectedHotel.hotelId
      );
      if (existingHotel) {
        const updatedHotels = data.map((hotel) => {
          if (hotel.hotelId === selectedHotel.hotelId) {
            const updatedHotel = {
              ...hotel,
              modules: updateModules(hotel.modules || [], { name: moduleName }, []),
            };
            return updatedHotel;
          }
          return hotel;
        });
        setData(updatedHotels);
      } else {
        const newHotel = {
          hotelId: selectedHotel.hotelId,
          name: selectedHotel.name,
          modules: [{ name: moduleName, submodules: [] }],
        };
        setData([...data, newHotel]);
      }
    }
  };

  const handleSubmoduleSelect = (selectedOptions) => {
    setSelectedSubmodules(
      selectedOptions.map((option) => ({ name: option.value }))
    );
    if (selectedModule) {
      const updatedHotels = data.map((hotel) => {
        if (hotel.hotelId === selectedHotel.hotelId) {
          return {
            ...hotel,
            modules: updateModules(hotel.modules, selectedModule, selectedOptions),
          };
        }
        return hotel;
      });
      setData(updatedHotels);
    }
  };

  const handleKeySelect = (e) => {
    const keyName = e.target.value;
    setSelectedKey(keyName);

    const keyDetails = configFields[0].Keys[0]; 
    if (keyDetails && keyDetails[keyName]) {
      setSelectedKeyValue(keyDetails[keyName][0]);
    }
  };

  const updateModules = (existingModules = [], module, submodules) => {
    if (!module) return existingModules;

    const moduleExists = existingModules.find((mod) => mod.name === module.name);

    if (moduleExists) {
      const updatedModules = existingModules.map((mod) => {
        if (mod.name === module.name) {
          return {
            ...mod,
            submodules: submodules.length > 0 ? [...new Set([...mod.submodules, ...submodules])] : mod.submodules,
          };
        }
        return mod;
      });
      return updatedModules;
    } else {
      return [
        ...existingModules,
        {
          name: module.name,
          submodules: submodules.length > 0 ? submodules : [],
        },
      ];
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: "1", padding: "20px", backgroundColor: "#f9f9f9", boxSizing: "border-box" }}>
        <h3>Select Hotel, Module, and Submodules</h3>
        <div>
          <label>Hotel:</label>
          <select value={selectedHotel.hotelId || ""} onChange={handleHotelSelect}>
            <option value="" disabled>Select Hotel</option>
            {configFields[0].hotels.map((hotel) => (
              <option key={hotel.hotelId} value={hotel.hotelId}>{hotel.name}</option>
            ))}
          </select>
        </div>

        {selectedHotel && (
          <>
            <div>
              <label>Module:</label>
              <select value={selectedModule.name || ""} onChange={handleModuleSelect}>
                <option value="" disabled>Select Module</option>
                {configFields[0].modules.map((module, index) => (
                  <option key={index} value={module}>{module}</option>
                ))}
              </select>
            </div>

            {selectedModule && (
              <div>
                <label>Submodules:</label>
                <Select
                  isMulti
                  options={configFields[0].submodules.map(submodule => ({ value: submodule, label: submodule }))}
                  value={selectedSubmodules.map(submodule => ({ value: submodule.name, label: submodule.name }))}
                  onChange={handleSubmoduleSelect}
                  styles={customStyles}
                />
              </div>
            )}

            <div>
              <label>Keys:</label>
              <select value={selectedKey || ""} onChange={handleKeySelect}>
                <option value="" disabled>Select Key</option>
                {Object.keys(configFields[0].Keys[0]).map((key, index) => (
                  <option key={index} value={key}>{key}</option>
                ))}
              </select>
            </div>

            {selectedKey && (
              <div>
                <label>Key Value:</label>
                <select value={selectedKeyValue} onChange={(e) => setSelectedKeyValue(e.target.value)}>
                  {configFields[0].Keys[0][selectedKey].map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ flex: "2", overflowY: "scroll", padding: "20px", boxSizing: "border-box", backgroundColor: "#fff" }}>
        {data.length > 0 && <FieldSelected data={data} setData={setData} />}
      </div>
    </div>
  );
};

export default FieldModules;

