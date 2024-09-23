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

  const updateData = (hotel, module, submodules, key, value) => {
    const existingHotel = data.find((h) => h.hotelId === hotel.hotelId);

    if (existingHotel) {
      const updatedHotels = data.map((h) => {
        if (h.hotelId === hotel.hotelId) {
          const updatedHotel = {
            ...h,
            fetchFromDb: key && value ? value : h.fetchFromDb, // Update fetchFromDb if key and value are selected
            modules: updateModules(h.modules, module, submodules, key, value),
          };
          return updatedHotel;
        }
        return h;
      });
      setData(updatedHotels);
    } else {
      const newHotel = {
        hotelId: hotel.hotelId,
        name: hotel.name,
        fetchFromDb: key && value ? value : undefined, // Set fetchFromDb if key and value are selected
        modules: updateModules([], module, submodules, key, value),
      };
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
    updateData(selected, null, [], null, null);
  };

  const handleModuleSelect = (e) => {
    const moduleName = e.target.value;
    setSelectedModule({ name: moduleName });
    setSelectedSubmodules([]);
    setSelectedKeys(null);
    updateData(selectedHotel, { name: moduleName }, [], null, null);
  };

  const handleSubmoduleSelect = (e) => {
    const submoduleName = e.target.value;

    if (!selectedSubmodules.includes(submoduleName)) {
      const newSubmodules = [...selectedSubmodules, submoduleName];
      setSelectedSubmodules(newSubmodules);

      updateData(selectedHotel, { name: selectedModule.name }, newSubmodules, null, null);
    }
  };

  const handleKeySelect = (e) => {
    const selectedKey = e.target.value;
    setSelectedKeys(selectedKey);
    setKeyValues(configFields[0].Keys[0][selectedKey] || []);
    if (selectedHotel && selectedModule) {
      updateData(selectedHotel, selectedModule, selectedSubmodules, selectedKey, null);
    }
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
          }));

          return {
            ...mod,
            submodules: [
              ...mod.submodules,
              ...updatedSubmodules.filter(
                (newSub) =>
                  !mod.submodules.some(
                    (existingSub) => existingSub.name === newSub.name
                  )
              ),
            ],
            ...(key && value ? { [key]: value } : {}), // Only add key-value if both are valid
          };
        }
        return mod;
      });
    } else {
      return [
        ...existingModules,
        {
          name: module ? module.name : null,
          submodules: submodules.map((sub) => ({
            name: sub,
          })),
          ...(key && value ? { [key]: value } : {}), // Only add key-value if both are valid
        },
      ];
    }
  };

  return (
    <div className="field-modules-container">
      <div className="field-modules">
        <h3>Select Hotel, Module, Submodule, and Keys</h3>

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
                    )
                    .map((submodule) => (
                      <option key={submodule} value={submodule}>
                        {submodule}
                      </option>
                    ))}
                </select>
              </div>
            )}

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
      {data.length > 0 && (
        <FieldSelected
          data={data.map(item => ({
            ...item,
            modules: item.modules.map(mod => ({
              ...mod,
              submodules: mod.submodules.filter(sub => sub.name),
            })).filter(mod => mod.name)
          }))}
          setData={setData}
        />
      )}
    </div>
  );
};

export default FieldModules;
