import React, { useState } from 'react';
import FieldSelected from './fieldSelected';
import { configFields } from '../../core/config';
import './styles.scss';

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodule, setSelectedSubmodule] = useState(""); // Store selected submodule
  const [selectedKeys, setSelectedKeys] = useState("");
  const [keyValues, setKeyValues] = useState([]);

  const updateData = (hotel, module, submodule, keys, value) => {
    const existingHotel = data.find((h) => h.hotelId === hotel.hotelId);

    if (existingHotel) {
      const updatedHotels = data.map((h) => {
        if (h.hotelId === hotel.hotelId) {
          const updatedHotel = { ...h };

          // Update modules if the module is selected
          if (module) {
            updatedHotel.modules = updateModules(
              h.modules || [],
              module,
              submodule,
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

      if (module) {
        newHotel.modules = updateModules([], module, submodule, keys, value);
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
      (mod) => mod.name === module.name
    );

    if (moduleExists) {
      return existingModules.map((mod) => {
        if (mod.name === module.name) {
          const updatedSubmodules = mod.submodules.map((sub) => {
            if (sub.name === submodule) {
              return { ...sub, [key]: value }; // Update only the selected submodule
            }
            return sub;
          });

          return {
            ...mod,
            submodules: updatedSubmodules,
          };
        }
        return mod;
      });
    } else {
      return [
        ...existingModules,
        {
          name: module.name,
          submodules: [{ name: submodule, [key]: value }],
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
  };

  const handleKeySelect = (e) => {
    const selectedKey = e.target.value;
    setSelectedKeys(selectedKey);
    setKeyValues(configFields[0].Keys[0][selectedKey] || []);
  };

  const handleValueSelect = (e) => {
    const selectedValue = e.target.value;

    if (selectedHotel && selectedModule && selectedSubmodule) {
      updateData(
        selectedHotel,
        selectedModule,
        selectedSubmodule,
        selectedKeys,
        selectedValue // Only set under submodule
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
                  {configFields[0].submodules.map((submodule) => (
                    <option key={submodule} value={submodule}>
                      {submodule}
                    </option>
                  ))}
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
