import React, { useState } from "react";
import Select from "react-select";
import FieldSelected from "./fieldSelected";
import { configFields } from "../../core/config";
import "./styles.scss"; // Import the styles

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedKeyValue, setSelectedKeyValue] = useState([]); // Ensure this is initialized as an array

  const handleDropdownChange = (hotel, module, submodules, keys, keyValues) => {
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

          const uniqueKeys = [
            ...new Set([...h.keys, ...keys.map((k) => k.key)]),
          ];
          const uniqueKeyValues = [
            ...new Set([...h.keyValues, ...keyValues.map((v) => v.value)]),
          ];

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
              keys: uniqueKeys,
              keyValues: uniqueKeyValues,
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
              keys: uniqueKeys,
              keyValues: uniqueKeyValues,
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
            },
          ],
          keys: keys.map((k) => k.key),
          keyValues: keyValues.map((v) => v.value),
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

  const handleKeySelect = (selectedOptions) => {
    setSelectedKeys(
      selectedOptions
        ? selectedOptions.map((option) => ({ key: option.value }))
        : []
    );
  };

  const handleKeyValueSelect = (selectedOptions) => {
    setSelectedKeyValue(
      selectedOptions
        ? selectedOptions.map((option) => ({ value: option.value }))
        : []
    );
  };

  const handleSubmoduleSelect = (selectedOptions) => {
    setSelectedSubmodules(
      selectedOptions
        ? selectedOptions.map((option) => ({ name: option.value }))
        : []
    );
  };

  const addSelection = () => {
    if (selectedHotel && selectedModule && selectedSubmodules.length > 0) {
      handleDropdownChange(
        selectedHotel,
        selectedModule,
        selectedSubmodules,
        selectedKeys,
        selectedKeyValue
      );
      setSelectedModule(null);
      setSelectedSubmodules([]);
      setSelectedKeys([]);
      setSelectedKeyValue([]); // Reset as an empty array
    }
  };

  console.log(data);
  return (
    <div className="field-modules">
      <h3>Select Hotel, Module, and Submodules</h3>
      <div className="field-modules-container">
        <div className="dropdown-container">
          <label>Hotel:</label>
          <select
            value={selectedHotel ? selectedHotel.hotelId : ""}
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
                value={selectedModule ? selectedModule.name : ""}
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
              <Select
                isMulti
                options={configFields[0].keys.map((key) => ({
                  value: key,
                  label: key,
                }))}
                value={selectedKeys.map((key) => ({
                  value: key.key,
                  label: key.key,
                }))}
                onChange={handleKeySelect}
              />
            </div>

            <div className="dropdown-container">
              <label>Values:</label>
              <Select
                isMulti
                options={configFields[0].values.map((value) => ({
                  value: value,
                  label: value,
                }))}
                value={selectedKeyValue.map((value) => ({
                  value: value.value,
                  label: value.value,
                }))}
                onChange={handleKeyValueSelect}
              />
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
