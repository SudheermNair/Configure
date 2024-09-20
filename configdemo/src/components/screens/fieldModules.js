// import React, { useState } from "react";
// import Select from "react-select";
// import FieldSelected from "./fieldSelected";
// import { configFields } from "../../core/config";
// import "./styles.scss";

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     boxShadow: "none",
//     border: "1px solid #ccc",
//     "&:hover": {
//       border: "1px solid #aaa",
//     },
//   }),
//   menu: (provided) => ({
//     ...provided,
//     zIndex: 9999,
//   }),
//   multiValue: (provided) => ({
//     ...provided,
//     backgroundColor: "#e0e0e0",
//   }),
//   multiValueLabel: (provided) => ({
//     ...provided,
//     color: "#333",
//   }),
//   multiValueRemove: (provided) => ({
//     ...provided,
//     color: "#d9534f",
//     ":hover": {
//       backgroundColor: "#d9534f",
//       color: "white",
//     },
//   }),
// };

// const FieldModules = () => {
//   const [data, setData] = useState([]);
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [selectedModule, setSelectedModule] = useState(null);
//   const [selectedSubmodules, setSelectedSubmodules] = useState([]);
//   const [selectedKeys, setSelectedKeys] = useState(null);
//   const [keyValues, setKeyValues] = useState([]);

//   const handleHotelSelect = (e) => {
//     const selected = configFields[0].hotels.find(
//       (hotel) => hotel.hotelId === e.target.value
//     );
//     setSelectedHotel(selected);
//   };

//   const handleModuleSelect = (e) => {
//     setSelectedModule({ name: e.target.value });
//   };

//   const handleSubmoduleSelect = (selectedOptions) => {
//     setSelectedSubmodules(
//       selectedOptions.map((option) => ({ name: option.value }))
//     );
//   };

//   const handleKeySelect = (e) => {
//     const selectedKey = e.target.value;
//     setSelectedKeys(selectedKey);
//     setKeyValues(configFields[0].Keys[0][selectedKey] || []);
//   };

//   const handleValueSelect = (e) => {
//     const selectedValue = e.target.value;

//     if (selectedHotel) {
//       const existingHotel = data.find(
//         (h) => h.hotelId === selectedHotel.hotelId
//       );

//       if (existingHotel) {
//         const updatedHotels = data.map((hotel) => {
//           if (hotel.hotelId === selectedHotel.hotelId) {
//             const updatedHotel = {
//               ...hotel,
//               [selectedKeys]: selectedValue,
//               modules: updateModules(
//                 hotel.modules,
//                 selectedModule,
//                 selectedSubmodules
//               ),
//             };
//             return updatedHotel;
//           }
//           return hotel;
//         });
//         setData(updatedHotels);
//       } else {
//         const newHotel = {
//           hotelId: selectedHotel.hotelId,
//           name: selectedHotel.name,
//           [selectedKeys]: selectedValue,
//           modules: updateModules([], selectedModule, selectedSubmodules),
//         };
//         setData([...data, newHotel]);
//       }
//     }

//     setSelectedModule(null);
//     setSelectedSubmodules([]);
//   };

//   const updateModules = (existingModules, module, submodules) => {
//     if (!module) return existingModules;

//     const moduleExists = existingModules.find(
//       (mod) => mod.name === module.name
//     );

//     if (moduleExists) {
//       const updatedModules = existingModules.map((mod) => {
//         if (mod.name === module.name) {
//           return {
//             ...mod,
//             submodules:
//               submodules.length > 0
//                 ? [...new Set([...mod.submodules, ...submodules])]
//                 : mod.submodules,
//           };
//         }
//         return mod;
//       });
//       return updatedModules;
//     } else {
//       return [
//         ...existingModules,
//         {
//           name: module.name,
//           submodules: submodules.length > 0 ? submodules : [],
//         },
//       ];
//     }
//   };

//   return (
//     <div className="field-modules-container">
//       <div className="field-modules">
//         <h3>Select Hotel, Module, Submodules, and Keys</h3>

//         {/* Hotel Dropdown */}
//         <div className="dropdown-container">
//           <label>Hotel:</label>
//           <select
//             value={selectedHotel?.hotelId || ""}
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

//         {/* Module Dropdown */}
//         {selectedHotel && (
//           <>
//             <div className="dropdown-container">
//               <label>Module:</label>
//               <select
//                 value={selectedModule?.name || ""}
//                 onChange={handleModuleSelect}
//               >
//                 <option value="" disabled>
//                   Select Module
//                 </option>
//                 {configFields[0].modules.map((module, index) => (
//                   <option key={index} value={module}>
//                     {module}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Submodule Dropdown */}
//             {selectedModule && (
//               <div className="dropdown-container">
//                 <label>Submodules:</label>
//                 <Select
//                   isMulti
//                   options={configFields[0].submodules.map((submodule) => ({
//                     value: submodule,
//                     label: submodule,
//                   }))}
//                   value={selectedSubmodules.map((submodule) => ({
//                     value: submodule.name,
//                     label: submodule.name,
//                   }))}
//                   onChange={handleSubmoduleSelect}
//                   styles={customStyles}
//                 />
//               </div>
//             )}

//             {/* Keys Dropdown */}
//             <div>
//               <label>Keys:</label>
//               <select value={selectedKeys || ""} onChange={handleKeySelect}>
//                 <option value="" disabled>
//                   Select Key
//                 </option>
//                 {Object.keys(configFields[0].Keys[0]).map((key, index) => (
//                   <option key={index} value={key}>
//                     {key}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Values Dropdown */}
//             {selectedKeys && (
//               <div>
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

//       {/* Selected Data Display */}

//       {data.length > 0 && <FieldSelected data={data} setData={setData} />}
//     </div>
//   );
// };

// export default FieldModules;

// New Code - working

// import React, { useState } from "react";
// import Select from "react-select";
// import FieldSelected from "./fieldSelected";
// import { configFields } from "../../core/config";
// import "./styles.scss";

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     boxShadow: "none",
//     border: "1px solid #ccc",
//     "&:hover": {
//       border: "1px solid #aaa",
//     },
//   }),
//   menu: (provided) => ({
//     ...provided,
//     zIndex: 9999,
//   }),
//   multiValue: (provided) => ({
//     ...provided,
//     backgroundColor: "#e0e0e0",
//   }),
//   multiValueLabel: (provided) => ({
//     ...provided,
//     color: "#333",
//   }),
//   multiValueRemove: (provided) => ({
//     ...provided,
//     color: "#d9534f",
//     ":hover": {
//       backgroundColor: "#d9534f",
//       color: "white",
//     },
//   }),
// };

// const FieldModules = () => {
//   const [data, setData] = useState([]);
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [selectedModule, setSelectedModule] = useState(null);
//   const [selectedSubmodules, setSelectedSubmodules] = useState([]);
//   const [selectedKeys, setSelectedKeys] = useState(null);
//   const [keyValues, setKeyValues] = useState([]);

//   const handleHotelSelect = (e) => {
//     const selected = configFields[0].hotels.find(
//       (hotel) => hotel.hotelId === e.target.value
//     );
//     setSelectedHotel(selected);
//   };

//   const handleModuleSelect = (e) => {
//     setSelectedModule({ name: e.target.value });
//   };

//   const handleSubmoduleSelect = (selectedOptions) => {
//     setSelectedSubmodules(
//       selectedOptions.map((option) => ({ name: option.value }))
//     );
//   };

//   const handleKeySelect = (e) => {
//     const selectedKey = e.target.value;
//     setSelectedKeys(selectedKey);
//     setKeyValues(configFields[0].Keys[0][selectedKey] || []);
//   };

//   const handleValueSelect = (e) => {
//     const selectedValue = e.target.value;

//     if (selectedHotel) {
//       const existingHotel = data.find(
//         (h) => h.hotelId === selectedHotel.hotelId
//       );

//       if (existingHotel) {
//         const updatedHotels = data.map((hotel) => {
//           if (hotel.hotelId === selectedHotel.hotelId) {
//             const updatedHotel = {
//               ...hotel,
//               [selectedKeys]: selectedValue, // Direct assignment for hotel level key-value pairs
//               modules: updateModules(
//                 hotel.modules,
//                 selectedModule,
//                 selectedSubmodules,
//                 selectedKeys,
//                 selectedValue
//               ),
//             };
//             return updatedHotel;
//           }
//           return hotel;
//         });
//         setData(updatedHotels);
//       } else {
//         const newHotel = {
//           hotelId: selectedHotel.hotelId,
//           name: selectedHotel.name,
//           [selectedKeys]: selectedValue, // Direct assignment for hotel level key-value pairs
//           modules: updateModules(
//             [],
//             selectedModule,
//             selectedSubmodules,
//             selectedKeys,
//             selectedValue
//           ),
//         };
//         setData([...data, newHotel]);
//       }
//     }

//     setSelectedModule(null);
//     setSelectedSubmodules([]);
//     setSelectedKeys(null);
//   };

//   const updateModules = (existingModules, module, submodules, key, value) => {
//     if (!module && !submodules.length) return existingModules;

//     const moduleExists = existingModules.find(
//       (mod) => mod.name === (module ? module.name : "")
//     );

//     if (moduleExists) {
//       const updatedModules = existingModules.map((mod) => {
//         if (mod.name === (module ? module.name : "")) {
//           return {
//             ...mod,
//             [key]: value, // Assign the key-value at the module level
//             submodules:
//               submodules.length > 0
//                 ? submodules.map((submodule) => ({
//                     ...submodule,
//                     [key]: value, // Assign the key-value at the submodule level
//                   }))
//                 : mod.submodules,
//           };
//         }
//         return mod;
//       });
//       return updatedModules;
//     } else {
//       return [
//         ...existingModules,
//         {
//           name: module ? module.name : null,
//           [key]: value, // Assign the key-value at the new module level
//           submodules:
//             submodules.length > 0
//               ? submodules.map((submodule) => ({
//                   name: submodule.name,
//                   [key]: value, // Assign the key-value at the new submodule level
//                 }))
//               : [],
//         },
//       ];
//     }
//   };

//   return (
//     <div className="field-modules-container">
//       <div className="field-modules">
//         <h3>Select Hotel, Module, Submodules, and Keys</h3>

//         {/* Hotel Dropdown */}
//         <div className="dropdown-container">
//           <label>Hotel:</label>
//           <select
//             value={selectedHotel?.hotelId || ""}
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

//         {/* Module Dropdown */}
//         {selectedHotel && (
//           <>
//             <div className="dropdown-container">
//               <label>Module:</label>
//               <select
//                 value={selectedModule?.name || ""}
//                 onChange={handleModuleSelect}
//               >
//                 <option value="" disabled>
//                   Select Module
//                 </option>
//                 {configFields[0].modules.map((module, index) => (
//                   <option key={index} value={module}>
//                     {module}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Submodule Dropdown */}
//             {selectedModule && (
//               <div className="dropdown-container">
//                 <label>Submodules:</label>
//                 <Select
//                   isMulti
//                   options={configFields[0].submodules.map((submodule) => ({
//                     value: submodule,
//                     label: submodule,
//                   }))}
//                   value={selectedSubmodules.map((submodule) => ({
//                     value: submodule.name,
//                     label: submodule.name,
//                   }))}
//                   onChange={handleSubmoduleSelect}
//                   styles={customStyles}
//                 />
//               </div>
//             )}

//             {/* Keys Dropdown */}
//             <div>
//               <label>Keys:</label>
//               <select value={selectedKeys || ""} onChange={handleKeySelect}>
//                 <option value="" disabled>
//                   Select Key
//                 </option>
//                 {Object.keys(configFields[0].Keys[0]).map((key, index) => (
//                   <option key={index} value={key}>
//                     {key}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Values Dropdown */}
//             {selectedKeys && (
//               <div>
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

//       {/* Selected Data Display */}
//       {data.length > 0 && <FieldSelected data={data} setData={setData} />}
//     </div>
//   );
// };

// export default FieldModules;

// new code
import React, { useState } from "react";
import Select from "react-select";
import FieldSelected from "./fieldSelected";
import { configFields } from "../../core/config";
import "./styles.scss";

const customStyles = {
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    border: "1px solid #ccc",
    "&:hover": {
      border: "1px solid #aaa",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#e0e0e0",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#333",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#d9534f",
    ":hover": {
      backgroundColor: "#d9534f",
      color: "white",
    },
  }),
};

const FieldModules = () => {
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubmodules, setSelectedSubmodules] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(null);
  const [keyValues, setKeyValues] = useState([]);

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
    setSelectedSubmodules(
      selectedOptions.map((option) => ({ name: option.value }))
    );
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
              [selectedKeys]: selectedValue, // Update hotel-level key-value pairs
              modules: updateModules(
                hotel.modules,
                selectedModule,
                selectedSubmodules,
                selectedKeys,
                selectedValue
              ),
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
          [selectedKeys]: selectedValue, // Direct assignment for hotel level key-value pairs
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

    // Clear the selectedModule, submodules, and keys after value is selected
    setSelectedModule(null);
    setSelectedSubmodules([]);
    setSelectedKeys(null);
  };

  const updateModules = (existingModules, module, submodules, key, value) => {
    if (!module && !submodules.length) return existingModules;

    const moduleExists = existingModules.find(
      (mod) => mod.name === (module ? module.name : "")
    );

    if (moduleExists) {
      const updatedModules = existingModules.map((mod) => {
        if (mod.name === (module ? module.name : "")) {
          return {
            ...mod,
            [key]: value, // Assign the key-value at the module level
            submodules:
              submodules.length > 0
                ? submodules.map((submodule) => ({
                    ...submodule,
                    [key]: value, // Assign the key-value at the submodule level
                  }))
                : mod.submodules,
          };
        }
        return mod;
      });
      return updatedModules;
    } else {
      return [
        ...existingModules,
        {
          name: module ? module.name : null,
          [key]: value, // Assign the key-value at the new module level
          submodules:
            submodules.length > 0
              ? submodules.map((submodule) => ({
                  name: submodule.name,
                  [key]: value, // Assign the key-value at the new submodule level
                }))
              : [],
        },
      ];
    }
  };

  return (
    <div className="field-modules-container">
      <div className="field-modules">
        <h3>Select Hotel, Module, Submodules, and Keys</h3>

        {/* Hotel Dropdown */}
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

        {/* Module Dropdown */}
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

            {/* Submodule Dropdown */}
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
                  styles={customStyles}
                />
              </div>
            )}

            {/* Keys Dropdown */}
            <div>
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

            {/* Values Dropdown */}
            {selectedKeys && (
              <div>
                <label>Values:</label>
                <select
                  // value={selectedValue || ""}
                  onChange={handleValueSelect}
                >
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
