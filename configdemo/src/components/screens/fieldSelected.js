import React, { useState, useCallback } from 'react';
import FieldSelected from './fieldSelected';
import { configFields } from '../../core/config';
import './styles.scss';

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodule, setSelectedSubmodule] = useState(''); // Store selected submodule
  const [selectedKeys, setSelectedKeys] = useState('');
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
    setSelectedSubmodule(''); // Reset submodule
    setSelectedKeys('');
  }, []);

  const handleModuleSelect = useCallback((e) => {
    const moduleName = e.target.value;
    setSelectedModule({ name: moduleName });
    setSelectedSubmodule(''); // Reset submodule
    setSelectedKeys('');
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
    setSelectedSubmodule('');
    setSelectedKeys('');
  };

  return (
    <div className="field-selected">
      <h1>Selected Configuration</h1>
      <div className="selected-json">
      <pre className="selected-json-container">
        {JSON.stringify(data, null, 2)}
      </pre>
      </div>
      <ul>
        {data.map((hotel, hotelIndex) => (
          <li key={hotelIndex}>
            <div className="hotel-id-info">
            <div className="hotel-info">
              {`Hotel: ${hotel.name}, ID: ${hotel.hotelId}`}
              <button
                className="remove-btn"
                onClick={() => removeItem(hotel.hotelId)}
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

            {Object.keys(hotel)
              .filter((key) => !["hotelId", "name", "modules", "title"].includes(key)) 
              .map((key) => (
                <div key={key} className="hotel-info">
                  {`${key}: ${hotel[key]}`}
                  <button
                    className="remove-btn"
                    onClick={() => removeKey(hotel.hotelId, key)}
                  >
                    <DeleteIcon style={{ fontSize: 18 }} />
                  </button>
                </div>
              ))}
            </div>
            {hotel.modules &&
              hotel.modules.length > 0 &&
              hotel.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="hotel-sub-info">
                  <div className="module-info">
                  {`Module: ${module.name}`}
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(hotel.hotelId, module.name)}
                  >
                    <DeleteIcon style={{ fontSize: 18 }} />
                  </button>
                  </div>
                  {module.submodules.map((submodule, submoduleIndex) => (
                    <div key={submoduleIndex} className="submodule-info" >
                    <div>
                      {`Submodule: ${submodule.name}`}
                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeItem(hotel.hotelId, module.name, submodule.name)
                        }
                      >
                        <DeleteIcon style={{ fontSize: 18 }} />
                      </button>
                    </div>
                            
                       {Object.keys(submodule).map((key) => {
                        if (key !== "name") {
                          return (
                            <div key={key}>
                              {`${key}: ${submodule[key]}`}
                              <button
                                className="remove-btn"
                                onClick={() =>
                                  removeKeyFromSubmodule(
                                    hotel.hotelId,
                                    module.name,
                                    submodule.name,
                                    key
                                  )
                                }
                              >
                                <DeleteIcon style={{ fontSize: 18 }} />
                              </button>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))}
                </div>
              ))}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default FieldSelected;


