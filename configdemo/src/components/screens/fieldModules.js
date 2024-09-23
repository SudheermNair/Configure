import React, { useState, useCallback } from "react";
import FieldSelected from "./fieldSelected";
import { configFields } from "../../core/config";
import "./styles.scss";

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodule, setSelectedSubmodule] = useState(""); // Store selected submodule
  const [selectedKeys, setSelectedKeys] = useState("");
  const [keyValues, setKeyValues] = useState([]);

  const updateData = (hotel, module, submodule, keys, value) => {
    const existingHotel = data.find((h) => h.hotelId === hotel.hotelId);
    const updatedSubmodule = {
      name: submodule,
      [keys]: value,
    };

    if (existingHotel) {
      const updatedHotels = data.map((h) => {
        if (h.hotelId === hotel.hotelId) {
          const updatedHotel = { ...h };

          // Only set key-value at hotel level if no module is selected
          if (!module) {
            updatedHotel[keys] = value; // Set directly under hotel
          } else {
            updatedHotel.modules = updateModules(
              h.modules || [],
              module,
              updatedSubmodule,
              keys,
              value
            );
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
      };

      // Set key-value pair only under the module if selected
      if (module) {
        newHotel.modules = updateModules(
          [],
          module,
          updatedSubmodule,
          keys,
          value
        );
      } else {
        newHotel[keys] = value; // Set directly under hotel if no module
      }

      setData([...data, newHotel]);
    }
  };

  const updateModules = (
    existingModules = [],
    module,
    submodule,
    key,
    value
  ) => {
    const moduleExists = existingModules.find(
      (mod) => mod.name === (module ? module.name : "")
    );

    if (moduleExists) {
      return existingModules.map((mod) => {
        if (mod.name === (module ? module.name : "")) {
          return {
            ...mod,
            submodules: [...new Set([...mod.submodules, submodule])], // Add submodule
            [key]: value,
          };
        }
        return mod;
      });
    } else {
      return [
        ...existingModules,
        {
          name: module ? module.name : null,
          [key]: value,
          submodules: [submodule],
        },
      ];
    }
  };

  const handleHotelSelect = useCallback((e) => {
    const selected = configFields[0].hotels.find(
      (hotel) => hotel.hotelId === e.target.value
    );
    setSelectedHotel(selected);
    setSelectedModule(null);
    setSelectedSubmodule(""); // Reset submodule
    setSelectedKeys("");
  }, []);

  const handleModuleSelect = useCallback((e) => {
    const moduleName = e.target.value;
    setSelectedModule({ name: moduleName });
    setSelectedSubmodule(""); // Reset submodule
    setSelectedKeys("");
  }, []);

  const handleSubmoduleSelect = (e) => {
    const submoduleName = e.target.value;
    setSelectedSubmodule(submoduleName);

    if (selectedHotel && selectedModule && selectedKeys) {
      updateData(
        selectedHotel,
        { name: selectedModule.name },
        submoduleName,
        selectedKeys,
        null
      );
    }
  };

  const handleKeySelect = (e) => {
    const selectedKey = e.target.value;
    setSelectedKeys(selectedKey);
    setKeyValues(configFields[0].Keys[0][selectedKey] || []);
  };

  const handleValueSelect = (e) => {
    const selectedValue = e.target.value;

    if (selectedHotel) {
      updateData(
        selectedHotel,
        selectedModule,
        selectedSubmodule,
        selectedKeys,
        selectedValue
      );
    }

    // Reset selections after updating data
    setSelectedModule(null);
    setSelectedSubmodule("");
    setSelectedKeys("");
  };

  return (
    <div className="field-modules-container">
      <div className="field-modules">
        <h3>Select Hotel, Module, Submodule and Keys</h3>

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
                  onChange={handleSubmoduleSelect}
                  value={selectedSubmodule || ""}
                >
                  <option value="" disabled>
                    Select Submodule
                  </option>
                  {configFields[0].submodules
                    .filter((submodule) => submodule !== selectedSubmodule) // Exclude the selected one
                    .map((submodule) => (
                      <option key={submodule} value={submodule}>
                        {submodule}
                      </option>
                    ))}
                  {selectedSubmodule && ( // Show the selected submodule at the top
                    <option value={selectedSubmodule} disabled>
                      {selectedSubmodule}
                    </option>
                  )}
                </select>
              </div>
            )}

            <div className="dropdown-container">
              <label>Keys:</label>
              <select value={selectedKeys || ""} onChange={handleKeySelect}>
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
              <div className="dropdown-container">
                <label>Values:</label>
                <select onChange={handleValueSelect} value="">
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
