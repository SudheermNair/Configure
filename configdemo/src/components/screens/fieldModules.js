// import React, { useState } from 'react';
// import FieldSelected from './fieldSelected';
// import { configFields } from '../../core/config';
// import './styles.scss';

// const FieldModules = () => {
//   const [data, setData] = useState([]);
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [selectedModule, setSelectedModule] = useState(null);
//   const [selectedSubmodules, setSelectedSubmodules] = useState([]);
//   const [selectedKeys, setSelectedKeys] = useState(null);
//   const [keyValues, setKeyValues] = useState([]);

//   const updateData = (hotel, module, submodules, keys, value) => {
//     const existingHotel = data.find((h) => h.hotelId === hotel.hotelId);
//     if (existingHotel) {
//       const updatedHotels = data.map((h) => {
//         if (h.hotelId === hotel.hotelId) {
//           const updatedHotel = {
//             ...h,
//             modules: updateModules(h.modules, module, submodules),
//           };
//           if (keys && value) {
//             updatedHotel[keys] = value;
//           }
//           return updatedHotel;
//         }
//         return h;
//       });
//       setData(updatedHotels);
//     } else {
//       const newHotel = {
//         hotelId: hotel.hotelId,
//         name: hotel.name,
//         modules: updateModules([], module, submodules),
//       };
//       if (keys && value) {
//         newHotel[keys] = value;
//       }
//       setData([...data, newHotel]);
//     }
//   };

//   const handleHotelSelect = (e) => {
//     const selectedId = e.target.value;
//     const selected = configFields[0].hotels.find(
//       (hotel) => hotel.hotelId === selectedId
//     );
//     setSelectedHotel(selected);
//     setData([]);
//     setSelectedModule(null);
//     setSelectedSubmodules([]);
//     setSelectedKeys(null);
//     setKeyValues([]);

//     updateData(selected, null, [], null, null);
//   };

//   const handleModuleSelect = (e) => {
//     const module = { name: e.target.value };
//     setSelectedModule(module);
//     setSelectedSubmodules([]);
//     setSelectedKeys(null);
//     setKeyValues([]);

//     updateData(selectedHotel, module, [], null, null);
//   };

//   const handleSubmoduleSelect = (e) => {
//     const submoduleName = e.target.value;

//     // Check if the submodule is already selected
//     if (!selectedSubmodules.includes(submoduleName)) {
//       const updatedSubmodules = [...selectedSubmodules, submoduleName];
//       setSelectedSubmodules(updatedSubmodules);

//       if (selectedHotel && selectedModule) {
//         updateData(
//           selectedHotel,
//           { name: selectedModule.name },
//           updatedSubmodules,
//           selectedKeys,
//           null
//         );
//       }
//     }
//   };

//   const handleRemoveSubmodule = (submodule) => {
//     const updatedSubmodules = selectedSubmodules.filter((s) => s !== submodule);
//     setSelectedSubmodules(updatedSubmodules);

//     if (selectedHotel && selectedModule) {
//       updateData(
//         selectedHotel,
//         { name: selectedModule.name },
//         updatedSubmodules,
//         selectedKeys,
//         null
//       );
//     }
//   };

//   const handleKeySelect = (e) => {
//     const selectedKey = e.target.value;
//     setSelectedKeys(selectedKey);
//     setKeyValues(configFields[0].Keys[0][selectedKey] || []);
//     updateData(
//       selectedHotel,
//       selectedModule,
//       selectedSubmodules,
//       selectedKey,
//       null
//     );
//   };

//   const handleValueSelect = (e) => {
//     const selectedValue = e.target.value;
//     if (selectedHotel) {
//       updateData(
//         selectedHotel,
//         selectedModule,
//         selectedSubmodules,
//         selectedKeys,
//         selectedValue
//       );
//     }
//   };

//   const updateModules = (existingModules, module, submodules) => {
//     if (!module) return existingModules;

//     const moduleExists = existingModules.find(
//       (mod) => mod.name === module.name
//     );

//     if (moduleExists) {
//       return existingModules.map((mod) => {
//         if (mod.name === module.name) {
//           return {
//             ...mod,
//             submodules: [
//               ...new Set([...mod.submodules.map((s) => s.name), ...submodules]),
//             ].map((name) => ({ name })),
//           };
//         }
//         return mod;
//       });
//     } else {
//       return [
//         ...existingModules,
//         {
//           name: module.name,
//           submodules:
//             submodules.length > 0 ? submodules.map((name) => ({ name })) : [],
//         },
//       ];
//     }
//   };

//   return (
//     <div className="field-modules-container">
//       <div className="field-modules">
//         <h3>Select Hotel, Module, Submodules and Keys</h3>
//         <div className="dropdown-container">
//           <label>Hotel:</label>
//           <select
//             value={selectedHotel?.hotelId || ''}
//             onChange={handleHotelSelect}
//           >
//             <option value="" disabled>
//               Select Hotel
//             </option>
//             {configFields[0].hotels.map((hotel) => (
//               <option key={hotel.hotelId} value={hotel.hotelId}>
//                 {hotel.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         {selectedHotel && (
//           <>
//             <div className="dropdown-container">
//               <label>Module:</label>
//               <select
//                 value={selectedModule?.name || ''}
//                 onChange={handleModuleSelect}
//               >
//                 <option value="" disabled>
//                   Select Module
//                 </option>
//                 {configFields[0].modules.map((module) => (
//                   <option key={module} value={module}>
//                     {module}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {selectedModule && (
//               <div className="dropdown-container">
//                 <label>Submodules:</label>
//                 <select onChange={handleSubmoduleSelect}>
//                   <option value="" disabled>
//                     Select Submodule
//                   </option>
//                   {configFields[0].submodules.map((submodule) => (
//                     <option key={submodule} value={submodule}>
//                       {submodule}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             <div className="dropdown-container">
//               <label>Keys:</label>
//               <select value={selectedKeys || ''} onChange={handleKeySelect}>
//                 <option value="" disabled>
//                   Select Key
//                 </option>
//                 {Object.keys(configFields[0].Keys[0]).map((key) => (
//                   <option key={key} value={key}>
//                     {key}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {selectedKeys && (
//               <div className="dropdown-container">
//                 <label>Values:</label>
//                 <select onChange={handleValueSelect}>
//                   <option value="" disabled>
//                     Select Value
//                   </option>
//                   {keyValues.map((value, index) => (
//                     <option key={index} value={value}>
//                       {value}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       {data.length > 0 && <FieldSelected data={data} setData={setData} />}
//     </div>
//   );
// };

// export default FieldModules;



import React, { useState } from 'react';
import FieldSelected from './fieldSelected';
import { configFields } from '../../core/config';
import './styles.scss';

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodules, setSelectedSubmodules] = useState([]); // Allow multiple submodule selections
  const [selectedKeys, setSelectedKeys] = useState(null);
  const [keyValues, setKeyValues] = useState([]);

  const updateData = (hotel, module, submodules, keys, value) => {
    const existingHotel = data.find((h) => h.hotelId === hotel.hotelId);
    if (existingHotel) {
      const updatedHotels = data.map((h) => {
        if (h.hotelId === hotel.hotelId) {
          const updatedHotel = {
            ...h,
            modules: updateModules(h.modules, module, submodules),
          };
          if (keys && value) {
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
        modules: updateModules([], module, submodules),
      };
      if (keys && value) {
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
    setSelectedSubmodules([]); // Reset submodules
    setSelectedKeys(null);
  };

  const handleModuleSelect = (e) => {
    setSelectedModule({ name: e.target.value });
    setSelectedSubmodules([]); // Reset submodules when selecting a module
    setSelectedKeys(null);
  };

  const handleSubmoduleSelect = (e) => {
    const submoduleName = e.target.value;

    // Prevent duplicate selections
    if (!selectedSubmodules.includes(submoduleName)) {
      setSelectedSubmodules([...selectedSubmodules, submoduleName]); // Add the selected submodule

      if (selectedHotel && selectedModule) {
        // Check if a key is selected before updating data
        if (selectedKeys && keyValues.length > 0) {
          updateData(
            selectedHotel,
            { name: selectedModule.name },
            [...selectedSubmodules, submoduleName], // Pass the updated submodules array
            selectedKeys,
            null
          );
        }
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
      const existingHotel = data.find(
        (h) => h.hotelId === selectedHotel.hotelId
      );

      if (existingHotel) {
        const updatedHotels = data.map((hotel) => {
          if (hotel.hotelId === selectedHotel.hotelId) {
            const updatedHotel = {
              ...hotel,
              modules: updateModules(
                hotel.modules,
                selectedModule,
                selectedSubmodules,
                selectedKeys,
                selectedValue
              ),
              [selectedKeys]: selectedModule ? undefined : selectedValue, // Assign only at hotel level if no module selected
            };
            return updatedHotel;
          }
          return hotel;
        });
        setData(updatedHotels);
      } else {
        const newHotel = {
          hotelId: selectedHotel.hotelId,
          name: selectedHotel.name,
          [selectedKeys]: selectedModule ? undefined : selectedValue, // Assign only at hotel level if no module selected
          modules: updateModules(
            [],
            selectedModule,
            selectedSubmodules,
            selectedKeys,
            selectedValue
          ),
        };
        setData([...data, newHotel]);
      }
    }

    // Reset selections after assigning value
    setSelectedModule(null);
    setSelectedSubmodules([]); // Reset submodules
    setSelectedKeys(null);
  };

  const updateModules = (existingModules, module, submodules, key, value) => {
    if (!module && !submodules.length) return existingModules;

    const moduleExists = existingModules.find(
      (mod) => mod.name === (module ? module.name : "")
    );

    if (moduleExists) {
      return existingModules.map((mod) => {
        if (mod.name === (module ? module.name : "")) {
          return {
            ...mod,
            [key]: value, // Assign the key-value at the module level
            submodules: [
              ...mod.submodules,
              ...submodules.map((sub) => ({ name: sub, [key]: value })),
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
          [key]: value, // Assign the key-value at the new module level
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
            value={selectedHotel?.hotelId || ""}
            onChange={handleHotelSelect}
          >
            <option value="" disabled>Select Hotel</option>
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
                value={selectedModule?.name || ""}
                onChange={handleModuleSelect}
              >
                <option value="" disabled>Select Module</option>
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
                  <option value="" disabled>Select Submodule</option>
                  {configFields[0].submodules
                    .filter((submodule) => !selectedSubmodules.includes(submodule)) // Exclude already selected submodules
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
              <select value={selectedKeys || ""} onChange={handleKeySelect}>
                <option value="" disabled>Select Key</option>
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
                  <option value="" disabled>Select Value</option>
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
