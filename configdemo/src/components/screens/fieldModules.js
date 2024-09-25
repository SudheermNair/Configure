import React, { useState, useCallback } from "react";
import FieldSelected from "./fieldSelected";
import { configFields } from "../../core/config";
import "./styles.scss";

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState("");
  const [keyValues, setKeyValues] = useState([]);

  // State for checkbox values
  const [checkboxState, setCheckboxState] = useState({
    isActive: false,
    isDisabled: false,
    isRequired: false,
  });

  const updateData = (hotel, module, submodules, key, value) => {
    setData((prevData) => {
      const updatedData = prevData.map((h) => {
        if (h.hotelId === hotel.hotelId) {
          const updatedHotel = { ...h };

          if (module) {
            updatedHotel.modules = updateModules(
              h.modules || [],
              module,
              submodules,
              key,
              value
            );
          } else if (key && value !== null && value !== undefined) {
            updatedHotel[key] = value;
          }

          return updatedHotel;
        }
        return h;
      });

      if (!updatedData.some((h) => h.hotelId === hotel.hotelId)) {
        const newHotel = {
          hotelId: hotel.hotelId,
          name: hotel.name,
        };

        if (module) {
          newHotel.modules = updateModules([], module, submodules, key, value);
        } else if (key && value !== null && value !== undefined) {
          newHotel[key] = value;
        }

        updatedData.push(newHotel);
      }

      return updatedData;
    });
  };

  const updateModules = (
    existingModules = [],
    module,
    submodules,
    key,
    value
  ) => {
    const moduleExists = existingModules.find(
      (mod) => mod.name === (module ? module.name : "")
    );

    if (moduleExists) {
      return existingModules.map((mod) => {
        if (mod.name === (module ? module.name : "")) {
          const updatedSubmodules = mod.submodules.map((sub) => {
            if (submodules.some((newSub) => newSub.name === sub.name)) {
              return {
                ...sub,
                [key]:
                  value !== null && value !== undefined ? value : undefined,
              };
            }
            return sub;
          });

          const newSubmodules = submodules.filter(
            (newSub) =>
              !mod.submodules.some(
                (existingSub) => existingSub.name === newSub.name
              )
          );

          return {
            ...mod,
            [key]:
              submodules.length === 0 && value !== null && value !== undefined
                ? value
                : undefined,
            submodules: [...updatedSubmodules, ...newSubmodules],
          };
        }
        return mod;
      });
    } else {
      return [
        ...existingModules,
        {
          name: module ? module.name : null,
          [key]:
            submodules.length === 0 && value !== null && value !== undefined
              ? value
              : undefined,
          submodules: submodules.map((sub) => ({
            ...sub,
            [key]: value !== null && value !== undefined ? value : undefined,
          })),
        },
      ];
    }
  };

  const handleHotelSelect = useCallback(
    (e) => {
      const selected = configFields[0].hotels.find(
        (hotel) => hotel.hotelId === e.target.value
      );

      const existingHotel = data.find((h) => h.hotelId === selected.hotelId);
      if (existingHotel) {
        setCheckboxState({
          isActive: existingHotel.isActive === "True",
          isDisabled: existingHotel.isDisabled === "True",
          isRequired: existingHotel.isRequired === "True",
        });
      } else {
        updateData(selected, null, [], null, null);
      }

      setSelectedHotel(selected);
    },
    [data]
  );

  const handleModuleSelect = useCallback(
    (e) => {
      const moduleName = e.target.value;
      const module = { name: moduleName };
      setSelectedModule(module);
      if (selectedHotel) {
        updateData(selectedHotel, module, [], null, null);
      }
    },
    [selectedHotel]
  );

  const handleSubmoduleSelect = useCallback(
    (e) => {
      const submoduleName = e.target.value;

      if (submoduleName) {
        setSelectedSubmodules((prevSubmodules) => {
          const newSubmodules = [...prevSubmodules, { name: submoduleName }];
          if (selectedHotel && selectedModule) {
            updateData(
              selectedHotel,
              selectedModule,
              newSubmodules,
              null,
              null
            );
          }
          return newSubmodules;
        });
      }
    },
    [selectedHotel, selectedModule]
  );

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
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    if (selectedHotel && selectedModule && selectedKeys) {
      updateData(
        selectedHotel,
        selectedModule,
        selectedSubmodules,
        name,
        checked ? "True" : "False"
      );
    }
  };

  const removeSubmodule = (submoduleName) => {
    setSelectedSubmodules((prevSubmodules) => {
      const updatedSubmodules = prevSubmodules.filter(
        (sub) => sub.name !== submoduleName
      );
      if (selectedHotel && selectedModule) {
        updateData(
          selectedHotel,
          selectedModule,
          updatedSubmodules,
          null,
          null
        );
      }
      return updatedSubmodules;
    });
  };

  return (
    <div className="field-modules-container">
      <div className="field-modules">
        <h3>Select Configuration</h3>

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
                <label>Submodules:</label>
                <div className="selected-submodules">
                  {selectedSubmodules.map((submodule) => (
                    <span key={submodule.name} className="selected-submodule">
                      {submodule.name}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeSubmodule(submodule.name);
                        }}
                        className="close-button"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <select onChange={handleSubmoduleSelect} value="">
                    <option value="" disabled>
                      Select Submodule
                    </option>
                    {configFields[0].submodules
                      .filter(
                        (submodule) =>
                          !selectedSubmodules.some(
                            (selectedSub) => selectedSub.name === submodule
                          )
                      )
                      .map((submodule) => (
                        <option key={submodule} value={submodule}>
                          {submodule}
                        </option>
                      ))}
                  </select>
                </div>
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

            {/* Checkbox Section */}
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={checkboxState.isActive}
                  onChange={handleCheckboxChange}
                />
                Is Active
              </label>
              {checkboxState.isActive && (
                <select
                  onChange={(e) =>
                    updateData(
                      selectedHotel,
                      selectedModule,
                      selectedSubmodules,
                      "isActive",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select value</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              )}
            </div>

            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  name="isDisabled"
                  checked={checkboxState.isDisabled}
                  onChange={handleCheckboxChange}
                />
                Is Disabled
              </label>
              {checkboxState.isDisabled && (
                <select
                  onChange={(e) =>
                    updateData(
                      selectedHotel,
                      selectedModule,
                      selectedSubmodules,
                      "isDisabled",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select value</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              )}
            </div>

            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  name="isRequired"
                  checked={checkboxState.isRequired}
                  onChange={handleCheckboxChange}
                />
                Is Required
              </label>
              {checkboxState.isRequired && (
                <select
                  onChange={(e) =>
                    updateData(
                      selectedHotel,
                      selectedModule,
                      selectedSubmodules,
                      "isRequired",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select value</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              )}
            </div>
          </>
        )}
      </div>

      {/* Displaying JSON data dynamically */}
      {data.length > 0 && <FieldSelected data={data} setData={setData} />}
    </div>
  );
};

export default FieldModules;