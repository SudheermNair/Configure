import React, { useState } from "react";
import Select from "react-select";
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

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(null);
  const [keyValues, setKeyValues] = useState([]);

  const updateData = (hotel, module, submodules, keys, value) => {
    const existingHotel = data.find((h) => h.hotelId === hotel.hotelId);
    if (existingHotel) {
      const updatedHotels = data.map((h) => {
        if (h.hotelId === hotel.hotelId) {
          const updatedHotel = {
            ...h,
            modules: updateModules(h.modules, module, submodules),
          };
          if (keys && value) {
            updatedHotel[keys] = value;
          }
          return updatedHotel;
        }
        return h;
      });
      setData(updatedHotels);
    } else {
      const newHotel = {
        hotelId: hotel.hotelId,
        name: hotel.name,
        modules: updateModules([], module, submodules),
      };
      if (keys && value) {
        newHotel[keys] = value;
      }
      setData([...data, newHotel]);
    }
  };

  const handleHotelSelect = (e) => {
    const selectedId = e.target.value;
    const selected = configFields[0].hotels.find(
      (hotel) => hotel.hotelId === selectedId
    );

    if (selected) {
      setSelectedHotel(selected);
      setSelectedModule(null);
      setSelectedSubmodules([]);
      updateData(selected, null, [], null, null);
    } else {
      setSelectedHotel(null);
      setSelectedModule(null);
      setSelectedSubmodules([]);
    }
  };

  const handleModuleSelect = (e) => {
    const moduleName = e.target.value;
    setSelectedModule(moduleName);
    updateData(selectedHotel, { name: moduleName }, selectedSubmodules, selectedKeys, null);
  };

  const handleSubmoduleSelect = (selectedOptions) => {
    const submodules = selectedOptions.map((option) => ({
      name: option.value,
    }));

    const uniqueSubmodules = Array.from(
      new Set([
        ...selectedSubmodules.map((s) => s.name),
        ...submodules.map((s) => s.name),
      ])
    ).map((name) => ({ name }));

    setSelectedSubmodules(uniqueSubmodules);

    if (selectedHotel && selectedModule) {
      updateData(selectedHotel, { name: selectedModule.name }, uniqueSubmodules, selectedKeys, null);
    }
  };

  const handleKeySelect = (e) => {
    const selectedKey = e.target.value;
    setSelectedKeys(selectedKey);
    setKeyValues(configFields[0].Keys[0][selectedKey] || []);
    updateData(selectedHotel, selectedModule, selectedSubmodules, selectedKey, null);
  };

  const handleValueSelect = (e) => {
    const selectedValue = e.target.value;
    if (selectedHotel) {
      updateData(selectedHotel, selectedModule, selectedSubmodules, selectedKeys, selectedValue);
    }
  };

  const updateModules = (existingModules, module, submodules) => {
    if (!module) return existingModules;

    const moduleExists = existingModules.find((mod) => mod.name === module.name);

    if (moduleExists) {
      return existingModules.map((mod) => {
        if (mod.name === module.name) {
          return {
            ...mod,
            submodules: [
              ...new Set([...mod.submodules.map(s => s.name), ...submodules.map(s => s.name)])
            ].map(name => ({ name }))
          };
        }
        return mod;
      });
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
    <div className="field-modules-container">
      <div className="field-modules">
        <h3>Select Hotel, Module, Submodules, and Keys</h3>
        <div className="dropdown-container">
          <label>Hotel:</label>
          <select
            value={selectedHotel?.hotelId || ""}
            onChange={handleHotelSelect}
          >
            <option value="" disabled>
              Select Hotel
            </option>
            {configFields[0].hotels.map((hotel) => (
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
                value={selectedModule?.name || ""}
                onChange={handleModuleSelect}
              >
                <option value="" disabled>
                  Select Module
                </option>
                {configFields[0].modules.map((module) => (
                  <option key={module} value={module}>
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
                  onChange={handleSubmoduleSelect}
                  styles={customStyles}
                />
              </div>
            )}
            <div>
              <label>Keys:</label>
              <select value={selectedKeys || ""} onChange={handleKeySelect}>
                <option value="" disabled>
                  Select Key
                </option>
                {Object.keys(configFields[0].Keys[0]).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            {selectedKeys && (
              <div>
                <label>Values:</label>
                <select onChange={handleValueSelect}>
                  <option value="" disabled>
                    Select Value
                  </option>
                  {keyValues.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
      </div>
      {data.length > 0 && <FieldSelected data={data} setData={setData} />}
    </div>
  );
};

export default FieldModules;