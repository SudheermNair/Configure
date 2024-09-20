import React, { useState, useEffect } from "react";
import Select from 'react-select';
import FieldSelected from "./fieldSelected";
import { configFields } from "../../core/config";
 
const customStyles = {
  control: (provided) => ({
    ...provided,
    boxShadow: 'none',
    border: '1px solid #ccc',
    '&:hover': {
      border: '1px solid #aaa',
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#e0e0e0',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#333',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#d9534f',
    ':hover': {
      backgroundColor: '#d9534f',
      color: 'white',
    },
  }),
};
 
const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(null);
  const [keyValues, setKeyValues] = useState([]);
 
  // Handle hotel selection
  const handleHotelSelect = (e) => {
    const selected = configFields[0].hotels.find(
      (hotel) => hotel.hotelId === e.target.value
    );
    setSelectedHotel(selected);
  };
 
  // Handle module selection
  const handleModuleSelect = (e) => {
    setSelectedModule({ name: e.target.value });
  };
 
  // Handle submodule selection
  const handleSubmoduleSelect = (selectedOptions) => {
    setSelectedSubmodules(selectedOptions.map((option) => ({ name: option.value })));
  };
 
  // Handle key selection and update key value dropdown
  const handleKeySelect = (e) => {
    const selectedKey = e.target.value;
    setSelectedKeys(selectedKey);
    setKeyValues(configFields[0].Keys[0][selectedKey] || []);
  };
 
  // Handle value selection for the selected key
  const handleValueSelect = (e) => {
    const selectedValue = e.target.value;
 
    if (selectedHotel) {
      const existingHotel = data.find((h) => h.hotelId === selectedHotel.hotelId);
 
      if (existingHotel) {
        // Update existing hotel object with key-value pairs or modules
        const updatedHotels = data.map((hotel) => {
          if (hotel.hotelId === selectedHotel.hotelId) {
            const updatedHotel = {
              ...hotel,
              [selectedKeys]: selectedValue,
              modules: updateModules(hotel.modules, selectedModule, selectedSubmodules),
            };
            return updatedHotel;
          }
          return hotel;
        });
        setData(updatedHotels);
      } else {
        // Add new hotel with key-value pairs and modules
        const newHotel = {
          hotelId: selectedHotel.hotelId,
          name: selectedHotel.name,
          [selectedKeys]: selectedValue,
          modules: updateModules([], selectedModule, selectedSubmodules),
        };
        setData([...data, newHotel]);
      }
    }
 
    // Clear selected module and submodules after updating the data
    setSelectedModule(null);
    setSelectedSubmodules([]);
  };
 
  // Update the modules in the hotel data based on selected module and submodules
  const updateModules = (existingModules, module, submodules) => {
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
        <h3>Select Hotel, Module, Submodules, and Keys</h3>
 
        {/* Hotel Dropdown */}
        <div>
          <label>Hotel:</label>
          <select value={selectedHotel?.hotelId || ""} onChange={handleHotelSelect}>
            <option value="" disabled>Select Hotel</option>
            {configFields[0].hotels.map((hotel) => (
              <option key={hotel.hotelId} value={hotel.hotelId}>{hotel.name}</option>
            ))}
          </select>
        </div>
 
        {/* Module Dropdown */}
        {selectedHotel && (
          <>
            <div>
              <label>Module:</label>
              <select value={selectedModule?.name || ""} onChange={handleModuleSelect}>
                <option value="" disabled>Select Module</option>
                {configFields[0].modules.map((module, index) => (
                  <option key={index} value={module}>{module}</option>
                ))}
              </select>
            </div>
 
            {/* Submodule Dropdown */}
            {selectedModule && (
              <div>
                <label>Submodules:</label>
                <Select
                  isMulti
                  options={configFields[0].submodules.map((submodule) => ({ value: submodule, label: submodule }))}
                  value={selectedSubmodules.map((submodule) => ({ value: submodule.name, label: submodule.name }))}
                  onChange={handleSubmoduleSelect}
                  styles={customStyles}
                />
              </div>
            )}
 
            {/* Keys Dropdown */}
            <div>
              <label>Keys:</label>
              <select value={selectedKeys || ""} onChange={handleKeySelect}>
                <option value="" disabled>Select Key</option>
                {Object.keys(configFields[0].Keys[0]).map((key, index) => (
                  <option key={index} value={key}>{key}</option>
                ))}
              </select>
            </div>
 
            {/* Values Dropdown */}
            {selectedKeys && (
              <div>
                <label>Values:</label>
                <select onChange={handleValueSelect}>
                  <option value="" disabled>Select Value</option>
                  {keyValues.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
      </div>
 
      {/* Selected Data Display */}
      <div style={{ flex: "2", overflowY: "scroll", padding: "20px", boxSizing: "border-box", backgroundColor: "#fff" }}>
        {data.length > 0 && <FieldSelected data={data} setData={setData} />}
      </div>
    </div>
  );
};
 
export default FieldModules;