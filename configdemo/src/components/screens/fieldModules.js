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
  const [selectedSubmodule, setSelectedSubmodule] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState("");
  const [keyValues, setKeyValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleHotelSelect = (e) => {
    const selected = configFields[0].hotels.find(
      (hotel) => hotel.hotelId === e.target.value
    );
    setSelectedHotel(selected);
    setSelectedModule(null);
    setSelectedSubmodule(null);
    setSelectedKeys("");
    setSelectedValue("");
  };

  const handleModuleSelect = (e) => {
    setSelectedModule({ name: e.target.value });
    setSelectedSubmodule(null);
    setSelectedKeys("");
    setSelectedValue("");
  };

  const handleSubmoduleSelect = (e) => {
    const selected = e.target.value;
    setSelectedSubmodule(selected);
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

      let updatedHotel;
      if (selectedModule || selectedSubmodule) {
        // If a module or submodule is selected, update the modules
        updatedHotel = existingHotel
          ? {
              ...existingHotel,
              modules: updateModules(
                existingHotel.modules || [],
                selectedModule,
                selectedSubmodule,
                selectedKeys,
                value
              ),
            }
          : {
              hotelId: selectedHotel.hotelId,
              name: selectedHotel.name,
              modules: updateModules(
                [],
                selectedModule,
                selectedSubmodule,
                selectedKeys,
                value
              ),
            };
      } else {
        // If no module is selected, just add the key-value under the hotel
        updatedHotel = existingHotel
          ? {
              ...existingHotel,
              [selectedKeys]: value,
            }
          : {
              hotelId: selectedHotel.hotelId,
              name: selectedHotel.name,
              [selectedKeys]: value,
            };
      }

      // Update the state with the modified hotel object
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
    setSelectedSubmodule(null);
    setSelectedKeys("");
  };

  const updateModules = (existingModules, module, submodule, key, value) => {
    const moduleExists = existingModules.find(
      (mod) => mod.name === (module ? module.name : "")
    );

    if (moduleExists) {
      return existingModules.map((mod) => {
        if (mod.name === (module ? module.name : "")) {
          if (submodule) {
            // If a submodule is selected, update it
            return {
              ...mod,
              submodules: [
                {
                  name: submodule,
                  [key]: value,
                },
              ],
            };
          } else {
            // If no submodule is selected, just update the module
            return {
              ...mod,
              [key]: value,
              submodules: mod.submodules || [], // Keep existing submodules
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
          [key]: submodule ? undefined : value,
          submodules: submodule
            ? [
                {
                  name: submodule,
                  [key]: value,
                },
              ]
            : [],
        },
      ];
    }
  };

  return (
    <div className="field-modules-container">
      <div className="field-modules">
        <h3>Select Configurations</h3>
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
                <label>Submodule:</label>
                <select
                  value={selectedSubmodule || ""}
                  onChange={handleSubmoduleSelect}
                >
                  <option value="" disabled>
                    Select Submodule
                  </option>
                  {configFields[0].submodules.map((submodule, index) => (
                    <option key={index} value={submodule}>
                      {submodule}
                    </option>
                  ))}
                </select>
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
