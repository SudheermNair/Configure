import React, { useState, useCallback } from "react";
import FieldSelected from "./fieldSelected";
import { configFields } from "../../core/config";
import "./styles.scss";

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [keyValues, setKeyValues] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState({
    firstCheckbox: false,
    secondCheckbox: false,
  });

  const updateData = (hotel, module, submodules, keys, value) => {
    const existingHotel = data.find((h) => h.hotelId === hotel.hotelId);
    const updatedSubmodules = submodules.map((sub) => ({
      name: sub,
      ...keys.reduce((acc, key) => ({ ...acc, [key]: value }), {}),
    }));

    if (existingHotel) {
      const updatedHotels = data.map((h) => {
        if (h.hotelId === hotel.hotelId) {
          const updatedHotel = { ...h };

          if (!module) {
            keys.forEach((key) => {
              updatedHotel[key] = value;
            });
          } else {
            updatedHotel.modules = updateModules(
              h.modules || [],
              module,
              updatedSubmodules
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
        newHotel.modules = updateModules([], module, updatedSubmodules);
      } else {
        keys.forEach((key) => {
          newHotel[key] = value;
        });
      }

      setData([...data, newHotel]);
    }
  };

  const updateModules = (existingModules = [], module, submodules) => {
    const moduleExists = existingModules.find(
      (mod) => mod.name === (module ? module.name : "")
    );

    if (moduleExists) {
      return existingModules.map((mod) => {
        if (mod.name === (module ? module.name : "")) {
          const updatedSubmodules = mod.submodules.map((existingSub) => {
            const newSub = submodules.find(
              (sub) => sub.name === existingSub.name
            );
            if (newSub) {
              return {
                ...existingSub,
                ...newSub,
              };
            }
            return existingSub;
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
          name: module ? module.name : null,
          submodules: submodules,
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
    setSelectedSubmodules([]);
    setSelectedKeys([]);

    if (selected) {
      const newHotelData = {
        hotelId: selected.hotelId,
        name: selected.name,
      };
      setData((prevData) => [...prevData, newHotelData]);
    }
  }, []);

  const handleModuleSelect = useCallback((e) => {
    const moduleName = e.target.value;
    setSelectedModule({ name: moduleName });
    setSelectedSubmodules([]);
    setSelectedKeys([]);
  }, []);

  const handleSubmoduleSelect = (e) => {
    const submoduleName = e.target.value;

    if (!selectedSubmodules.includes(submoduleName)) {
      const newSubmodules = [...selectedSubmodules, submoduleName];
      setSelectedSubmodules(newSubmodules);

      if (selectedHotel && selectedModule && selectedKeys.length) {
        updateData(
          selectedHotel,
          { name: selectedModule.name },
          newSubmodules,
          selectedKeys,
          null
        );
      }
    }
  };

  const handleKeySelect = (e) => {
    const selectedKey = e.target.value;
    setSelectedKeys((prev) => {
      if (!prev.includes(selectedKey)) {
        return [...prev, selectedKey];
      }
      return prev; // Prevent duplicates
    });

    setCheckboxValues({
      firstCheckbox: false,
      secondCheckbox: false,
    });

    setKeyValues(configFields[0].Keys[0][selectedKey] || []);
  };

  const handleValueSelect = (e) => {
    const selectedValue = e.target.value;

    if (selectedKeys.length) {
      selectedKeys.forEach((key) => {
        if (selectedHotel) {
          updateData(
            selectedHotel,
            selectedModule,
            selectedSubmodules,
            [key],
            selectedValue
          );
        }
      });
    }

    setSelectedModule(null);
    setSelectedSubmodules([]);
    setSelectedKeys([]);
  };

  return (
    <div className="field-modules-container">
      <div className="field-modules">
        <h3>Select Configuration</h3>

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
                <select onChange={handleSubmoduleSelect} value="">
                  <option value="" disabled>
                    {selectedSubmodules.length > 0
                      ? `${selectedSubmodules.join(", ")}`
                      : "Select Submodule"}
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
              <select
                value={selectedKeys.join(",") || ""}
                onChange={handleKeySelect}
              >
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

            {selectedKeys.length > 0 && (
              <>
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

                {/* Conditional Checkboxes for "firstname" */}
                {selectedKeys.includes("firstname") && (
                  <div className="checkbox-container">
                    <label>
                      <input
                        type="checkbox"
                        checked={checkboxValues.firstCheckbox}
                        onChange={(e) =>
                          setCheckboxValues((prev) => ({
                            ...prev,
                            firstCheckbox: e.target.checked,
                          }))
                        }
                      />
                      First Checkbox
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={checkboxValues.secondCheckbox}
                        onChange={(e) =>
                          setCheckboxValues((prev) => ({
                            ...prev,
                            secondCheckbox: e.target.checked,
                          }))
                        }
                      />
                      Second Checkbox
                    </label>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {data.length > 0 && <FieldSelected data={data} setData={setData} />}
    </div>
  );
};

export default FieldModules;
