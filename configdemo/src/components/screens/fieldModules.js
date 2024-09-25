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
      ...sub, // Keep the existing submodule structure
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
              updatedSubmodules,
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
        newHotel.modules = updateModules(
          [],
          module,
          updatedSubmodules,
          keys,
          value
        );
      } else {
        newHotel[keys] = value;
      }

      setData([...data, newHotel]);
    }
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
          if (submodules.length === 0) {
            return { ...mod, [key]: value };
          }

          const newSubmodules = submodules.filter(
            (newSub) =>
              !mod.submodules.some(
                (existingSub) => existingSub.name === newSub.name
              )
          );

          return {
            ...mod,
            submodules: [...mod.submodules, ...newSubmodules],
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

  const handleModuleSelect = useCallback(
    (e) => {
      const moduleName = e.target.value;
      setSelectedModule({ name: moduleName });
      setSelectedSubmodules([]);
      setSelectedKeys("");

      if (selectedHotel) {
        const existingHotel = data.find(
          (h) => h.hotelId === selectedHotel.hotelId
        );

        if (existingHotel) {
          const updatedModules = existingHotel.modules || [];
          const moduleExists = updatedModules.some(
            (mod) => mod.name === moduleName
          );

          if (!moduleExists) {
            updatedModules.push({
              name: moduleName,
            });

            setData((prevData) =>
              prevData.map((h) =>
                h.hotelId === selectedHotel.hotelId
                  ? { ...h, modules: updatedModules }
                  : h
              )
            );
          }
        }
      }
    },
    [selectedHotel, data]
  );

  const handleSubmoduleSelect = useCallback(
    (e) => {
      const submoduleName = e.target.value;

      if (!selectedSubmodules.some((sub) => sub.name === submoduleName)) {
        const newSubmodule = { name: submoduleName }; // Create an object for the submodule
        const newSubmodules = [...selectedSubmodules, newSubmodule];
        setSelectedSubmodules(newSubmodules);

        if (selectedHotel && selectedModule) {
          const existingHotel = data.find(
            (h) => h.hotelId === selectedHotel.hotelId
          );

          if (existingHotel) {
            const updatedModules = existingHotel.modules || [];
            const moduleExists = updatedModules.some(
              (mod) => mod.name === selectedModule.name
            );

            if (moduleExists) {
              const updatedSubmodules = updatedModules.map((mod) => {
                if (mod.name === selectedModule.name) {
                  return {
                    ...mod,
                    submodules: [...(mod.submodules || []), newSubmodule], // Add the new object
                  };
                }
                return mod;
              });

              setData((prevData) =>
                prevData.map((h) =>
                  h.hotelId === selectedHotel.hotelId
                    ? { ...h, modules: updatedSubmodules }
                    : h
                )
              );
            }
          }
        }
      }
    },
    [selectedHotel, selectedModule, selectedSubmodules, data]
  );

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

    // Load the corresponding values based on the selected key
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
                      ? `${selectedSubmodules
                          .map((sub) => sub.name)
                          .join(", ")}`
                      : "Select Submodule"}
                  </option>
                  {configFields[0].submodules
                    .filter(
                      (submodule) =>
                        !selectedSubmodules.some((s) => s.name === submodule)
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
              <select value="" onChange={handleKeySelect}>
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
              </>
            )}
          </>
        )}
      </div>

      <FieldSelected data={data} setData={setData} />
    </div>
  );
};

export default FieldModules;
