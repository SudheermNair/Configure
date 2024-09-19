import React, { useState } from "react";
import Select from 'react-select';
import FieldSelected from "./fieldSelected";
import { configFields } from "../../core/config";

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);

  const handleDropdownChange = (hotel, module, submodules) => {
    const existingHotel = data.find((h) => h.hotelId === hotel.hotelId);

    if (existingHotel) {
      const updatedHotels = data.map((h) => {
        if (h.hotelId === hotel.hotelId) {
          const moduleExists = h.modules.find((mod) => mod.name === module.name);

          if (moduleExists) {
            const updatedModules = h.modules.map((mod) => {
              if (mod.name === module.name) {
                return {
                  ...mod,
                  submodules: [...new Set([...mod.submodules, ...submodules])],
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
                  submodules,
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
          hotelId: hotel.hotelId,
          name: hotel.name,
          modules: [
            {
              name: module.name,
              submodules,
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

  const handleSubmoduleSelect = (selectedOptions) => {
    setSelectedSubmodules(selectedOptions.map(option => ({ name: option.value })));
  };

  const addSelection = () => {
    if (selectedHotel && selectedModule && selectedSubmodules.length > 0) {
      handleDropdownChange(selectedHotel, selectedModule, selectedSubmodules);
      setSelectedModule("");
      setSelectedSubmodules([]);
    }
  };

  return (
    <div>
      <h3>Select Hotel, Module, and Submodules</h3>
      <div>
        <label>Hotel:</label>
        <select value={selectedHotel.hotelId || ""} onChange={handleHotelSelect}>
          <option value="" disabled>Select Hotel</option>
          {configFields[0].hotels.map((hotel) => (
            <option key={hotel.hotelId} value={hotel.hotelId}>{hotel.name}</option>
          ))}
        </select>
      </div>

      {selectedHotel && (
        <>
          <div>
            <label>Module:</label>
            <select value={selectedModule.name || ""} onChange={handleModuleSelect}>
              <option value="" disabled>Select Module</option>
              {configFields[0].modules.map((module, index) => (
                <option key={index} value={module}>{module}</option>
              ))}
            </select>
          </div>

          {selectedModule && (
            <div>
              <label>Submodules:</label>
              <Select
                isMulti
                options={configFields[0].submodules.map(submodule => ({ value: submodule, label: submodule }))}
                value={selectedSubmodules.map(submodule => ({ value: submodule.name, label: submodule.name }))}
                onChange={handleSubmoduleSelect}
              />
            </div>
          )}

          <button onClick={addSelection}>Add Selection</button>
        </>
      )}

      <FieldSelected data={data} setData={setData} />
    </div>
  );
};

export default FieldModules;