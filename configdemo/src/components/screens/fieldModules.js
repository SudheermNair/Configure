import React, { useState } from "react";
import Select from "react-select";
import FieldSelected from "./fieldSelected";
import { configFields } from "../../core/config";
import "./styles.scss"; // Import the styles

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedKeyValue, setSelectedKeyValue] = useState([]);

  // Refactored handleDropdownChange to handle keys and values
  const handleDropdownChange = (hotel, module, submodules, keys, keyValue) => {
    const hotelId = hotel.hotelId;
    const existingHotel = data.find((h) => h.hotelId === hotelId);

    if (existingHotel) {
      const updatedHotels = data.map((h) => {
        if (h.hotelId === hotelId) {
          const moduleExists = h.modules.find(
            (mod) => mod.name === module.name
          );

          if (moduleExists) {
            const updatedModules = h.modules.map((mod) => {
              if (mod.name === module.name) {
                const uniqueSubmodules = [
                  ...new Set([
                    ...mod.submodules.map((sub) => sub.name),
                    ...submodules.map((sub) => sub.name),
                  ]),
                ];
                return {
                  ...mod,
                  submodules: uniqueSubmodules.map((name) => ({ name })),
                  keys, // Add keys to the module
                  keyValue, // Add values to the module
                };
              }
              return mod;
            });
            return { ...h, modules: updatedModules };
          } else {
            return {
              ...h,
              modules: [
                ...h.modules,
                {
                  name: module.name,
                  submodules: submodules.map((sub) => ({ name: sub.name })),
                  keys, // Add keys to the module
                  keyValue, // Add values to the module
                },
              ],
            };
          }
        }
        return h;
      });
      setData(updatedHotels);
    } else {
      setData([
        ...data,
        {
          hotelId: hotelId,
          name: hotel.name,
          modules: [
            {
              name: module.name,
              submodules: submodules.map((sub) => ({ name: sub.name })),
              keys, // Add keys to the module
              keyValue, // Add values to the module
            },
          ],
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

  const handleKeySelect = (selectedOption) => {
    setSelectedKeys(selectedOption.value);
  };

  const handleKeyValueSelect = (e) => {
    setSelectedKeyValue(e.target.value);
  };

  const handleSubmoduleSelect = (selectedOptions) => {
    setSelectedSubmodules(
      selectedOptions.map((option) => ({ name: option.value }))
    );
  };

  // Add keys and values when adding selection
  const addSelection = () => {
    if (
      selectedHotel &&
      selectedModule &&
      selectedSubmodules.length > 0 &&
      selectedKeys &&
      selectedKeyValue
    ) {
      handleDropdownChange(
        selectedHotel,
        selectedModule,
        selectedSubmodules,
        selectedKeys,
        selectedKeyValue
      );
      setSelectedModule("");
      setSelectedSubmodules([]);
      setSelectedKeys([]);
      setSelectedKeyValue([]);
    }
  };

  return (
    <div className="field-modules">
      <h3>Select Hotel, Module, and Submodules</h3>
      <div className="field-modules-container">
        <div className="dropdown-container">
          <label>Hotel:</label>
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
            ))}
          </select>
        </div>

        {selectedHotel && (
          <>
            <div className="dropdown-container">
              <label>Module:</label>
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
                />
              </div>
            )}

            <div className="dropdown-container">
              <label>Keys:</label>
              <select value={selectedKeys} onChange={handleKeySelect}>
                <option value="" disabled>
                  Select Keys
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
              <select value={selectedKeyValue} onChange={handleKeyValueSelect}>
                <option value="" disabled>
                  Select Values
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
          <FieldSelected data={data} setData={setData} />
        ) : (
          <p>No data selected yet.</p>
        )}
      </div>
    </div>
  );
};

export default FieldModules;
