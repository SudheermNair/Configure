import React, { useState } from 'react';
import FieldSelected from './fieldSelected';
import { configFields } from '../../core/config';
import './styles.scss';

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
            modules: updateModules(h.modules, module, submodules, keys, value),
          };
          // Apply key-value at hotel level if no module is selected
          if (!module && keys && value) {
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
        modules: updateModules([], module, submodules, keys, value),
      };
      // Apply key-value at hotel level if no module is selected
      if (!module && keys && value) {
        newHotel[keys] = value;
      }
      setData([...data, newHotel]);
    }
  };

  const handleHotelSelect = (e) => {
    const selected = configFields[0].hotels.find(
      (hotel) => hotel.hotelId === e.target.value
    );
    setSelectedHotel(selected);
    setSelectedModule(null);
    setSelectedSubmodules([]);
    setSelectedKeys(null);
  };

  const handleModuleSelect = (e) => {
    const moduleName = e.target.value;
    setSelectedModule({ name: moduleName });
    setSelectedSubmodules([]);
    setSelectedKeys(null);
  };

  const handleSubmoduleSelect = (e) => {
    const submoduleName = e.target.value;

    // Prevent duplicate selections
    if (!selectedSubmodules.includes(submoduleName)) {
      const newSubmodules = [...selectedSubmodules, submoduleName];
      setSelectedSubmodules(newSubmodules);

      // Update data only if a key is selected
      if (selectedHotel && selectedModule && selectedKeys) {
        updateData(
          selectedHotel,
          { name: selectedModule.name },
          newSubmodules,
          selectedKeys,
          null // No value assigned yet
        );
      }
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
        selectedSubmodules,
        selectedKeys,
        selectedValue
      );
    }

    // Reset selections after assigning value
    setSelectedModule(null);
    setSelectedSubmodules([]);
    setSelectedKeys(null);
  };

  const updateModules = (existingModules, module, submodules, key, value) => {
    if (!module && !submodules.length) return existingModules;

    const moduleExists = existingModules.find(
      (mod) => mod.name === (module ? module.name : '')
    );

    if (moduleExists) {
      return existingModules.map((mod) => {
        if (mod.name === (module ? module.name : '')) {
          const updatedSubmodules = submodules.map((sub) => ({
            name: sub,
            [key]: value, // Assign key-value for each submodule
          }));

          return {
            ...mod,
            [key]: module ? value : mod[key], // Assign key-value for the module
            submodules: [
              ...mod.submodules,
              ...updatedSubmodules.filter(
                (newSub) =>
                  !mod.submodules.some(
                    (existingSub) => existingSub.name === newSub.name
                  )
              ),
            ],
          };
        }
        return mod;
      });
    } else {
      return [
        ...existingModules,
        {
          name: module ? module.name : null,
          [key]: module ? value : undefined, // Assign key-value for the new module
          submodules: submodules.map((sub) => ({ name: sub, [key]: value })),
        },
      ];
    }
  };

  return (
    <div className="field-modules-container">
      <div className="field-modules">
        <h3>Select Hotel, Module, Submodule, and Keys</h3>

        {/* Hotel Dropdown */}
        <div className="dropdown-container">
          <label>Hotel:</label>
          <select
            value={selectedHotel?.hotelId || ''}
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

        {/* Module Dropdown */}
        {selectedHotel && (
          <>
            <div className="dropdown-container">
              <label>Module:</label>
              <select
                value={selectedModule?.name || ''}
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

            {/* Submodule Dropdown */}
            {selectedModule && (
              <div className="dropdown-container">
                <label>Submodule:</label>
                <select onChange={handleSubmoduleSelect} value="">
                  <option value="" disabled>
                    Select Submodule
                  </option>
                  {configFields[0].submodules
                    .filter(
                      (submodule) => !selectedSubmodules.includes(submodule)
                    ) // Exclude already selected submodules
                    .map((submodule) => (
                      <option key={submodule} value={submodule}>
                        {submodule}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Keys Dropdown */}
            <div className="dropdown-container">
              <label>Keys:</label>
              <select value={selectedKeys || ''} onChange={handleKeySelect}>
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

            {/* Values Dropdown */}
            {selectedKeys && (
              <div className="dropdown-container">
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

      {/* Selected Data Display */}
      {data.length > 0 && <FieldSelected data={data} setData={setData} />}
    </div>
  );
};

export default FieldModules;
