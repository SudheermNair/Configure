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
  const [selectedKeys, setSelectedKeys] = useState("");
  const [keyValues, setKeyValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [context, setContext] = useState("module"); // To track if we are selecting for module or submodule

  const handleHotelSelect = (e) => {
    const selected = configFields[0].hotels.find(
      (hotel) => hotel.hotelId === e.target.value
    );
    setSelectedHotel(selected);
    setSelectedModule(null);
    setSelectedSubmodules([]);
    setSelectedKeys("");
    setSelectedValue("");
    setContext("module"); // Reset context to module
  };

  const handleModuleSelect = (e) => {
    setSelectedModule({ name: e.target.value });
    setSelectedSubmodules([]);
    setSelectedKeys("");
    setSelectedValue("");
    setContext("module"); // Set context to module
  };

  const handleSubmoduleSelect = (selectedOptions) => {
    setSelectedSubmodules(
      selectedOptions.map((option) => ({ name: option.value }))
    );
    setContext("submodule"); // Set context to submodule
  };

  const handleKeySelect = (e) => {
    const selectedKey = e.target.value;
    setSelectedKeys(selectedKey);
    setKeyValues(configFields[0].Keys[0][selectedKey] || []);
    setSelectedValue("");
  };

  const handleValueSelect = (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    if (selectedHotel) {
      const existingHotel = data.find(
        (h) => h.hotelId === selectedHotel.hotelId
      );

      const updatedHotel = existingHotel
        ? {
            ...existingHotel,
            modules: updateModules(
              existingHotel.modules,
              selectedModule,
              selectedSubmodules,
              selectedKeys,
              value,
              context // Pass context to differentiate between module and submodule
            ),
          }
        : {
            hotelId: selectedHotel.hotelId,
            name: selectedHotel.name,
            modules: updateModules(
              [],
              selectedModule,
              selectedSubmodules,
              selectedKeys,
              value,
              context
            ),
          };

      if (existingHotel) {
        setData(
          data.map((hotel) =>
            hotel.hotelId === selectedHotel.hotelId ? updatedHotel : hotel
          )
        );
      } else {
        setData([...data, updatedHotel]);
      }
    }

    // Reset other states after selection
    setSelectedModule(null);
    setSelectedSubmodules([]);
    setSelectedKeys("");
  };

  const updateModules = (
    existingModules,
    module,
    submodules,
    key,
    value,
    context
  ) => {
    const moduleExists = existingModules.find(
      (mod) => mod.name === (module ? module.name : "")
    );

    if (moduleExists) {
      return existingModules.map((mod) => {
        if (mod.name === (module ? module.name : "")) {
          if (context === "submodule") {
            // If the context is submodule, update the selected submodules
            return {
              ...mod,
              submodules:
                submodules.length > 0
                  ? submodules.map((sub) => ({
                      name: sub.name,
                      [key]: value,
                    }))
                  : mod.submodules,
            };
          } else {
            // If the context is module, update the module directly
            return {
              ...mod,
              [key]: value,
              submodules: mod.submodules, // Keep existing submodules
            };
          }
        }
        return mod;
      });
    } else {
      return [
        ...existingModules,
        {
          name: module ? module.name : null,
          [key]: context === "module" ? value : undefined, // Set value directly under module if context is module
          submodules:
            context === "submodule"
              ? submodules.map((sub) => ({
                  name: sub.name,
                  [key]: value,
                }))
              : [],
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
                {configFields[0].modules.map((module, index) => (
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
                  onChange={handleSubmoduleSelect}
                  styles={customStyles}
                />
              </div>
            )}

            <div>
              <label>Keys:</label>
              <select value={selectedKeys} onChange={handleKeySelect}>
                <option value="" disabled>
                  Select Key
                </option>
                {Object.keys(configFields[0].Keys[0]).map((key, index) => (
                  <option key={index} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            {selectedKeys && (
              <div>
                <label>Values:</label>
                <select onChange={handleValueSelect} value={selectedValue}>
                  <option value="" disabled>
                    Select Value
                  </option>
                  {keyValues.length > 0 &&
                    keyValues.map((value, index) => (
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
