// import React, { useState } from "react";
// import Select from 'react-select';
// import FieldSelected from "./fieldSelected";
// import { configFields } from "../../core/config";
// import './styles.scss'; 

// const FieldModules = () => {
//   const [data, setData] = useState([]);
//   const [selectedHotel, setSelectedHotel] = useState("");
//   const [selectedModule, setSelectedModule] = useState("");
//   const [selectedSubmodules, setSelectedSubmodules] = useState([]);

//   const handleDropdownChange = (hotel, module, submodules) => {
//     const hotelId = hotel.hotelId;
//     const existingHotel = data.find((h) => h.hotelId === hotelId);

//     if (existingHotel) {
//       const updatedHotels = data.map((h) => {
//         if (h.hotelId === hotelId) {
//           const moduleExists = h.modules.find((mod) => mod.name === module.name);
//           if (moduleExists) {
//             const updatedModules = h.modules.map(mod => {
//               if (mod.name === module.name) {
//                 const uniqueSubmodules = [
//                   ...new Set([...mod.submodules.map(sub => sub.name), ...submodules.map(sub => sub.name)])
//                 ];
//                 return {
//                   ...mod,
//                   submodules: uniqueSubmodules.map(name => ({ name })),
//                 };
//               }
//               return mod;
//             });
//             return { ...h, modules: updatedModules };
//           } else {
//             return {
//               ...h,
//               modules: [
//                 ...h.modules,
//                 {
//                   name: module.name,
//                   submodules: submodules.map(sub => ({ name: sub.name })),
//                 },
//               ],
//             };
//           }
//         }
//         return h;
//       });
//       setData(updatedHotels);
//     } else {
//       setData([
//         ...data,
//         {
//           hotelId: hotelId,
//           name: hotel.name,
//           modules: [
//             {
//               name: module.name,
//               submodules: submodules.map(sub => ({ name: sub.name })),
//             },
//           ],
//         },
//       ]);
//     }
//   };

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
//     setSelectedSubmodules(selectedOptions.map(option => ({ name: option.value })));
//   };

//   const addSelection = () => {
//     if (selectedHotel && selectedModule && selectedSubmodules.length > 0) {
//       handleDropdownChange(selectedHotel, selectedModule, selectedSubmodules);
//       setSelectedModule("");
//       setSelectedSubmodules([]);
//     }
//   };

//   return (
//     <div className="field-modules">
//       <h3>Select Hotel, Module, and Submodules</h3>
//       <div className="field-modules-container">
//         <div className="dropdown-container">
//           <label>Hotel:</label>
//           <select value={selectedHotel.hotelId || ""} onChange={handleHotelSelect}>
//             <option value="" disabled>Select Hotel</option>
//             {configFields[0].hotels.map((hotel) => (
//               <option key={hotel.hotelId} value={hotel.hotelId}>{hotel.name}</option>
//             ))}
//           </select>
//         </div>

//         {selectedHotel && (
//           <>
//             <div className="dropdown-container">
//               <label>Module:</label>
//               <select value={selectedModule.name || ""} onChange={handleModuleSelect}>
//                 <option value="" disabled>Select Module</option>
//                 {configFields[0].modules.map((module, index) => (
//                   <option key={index} value={module}>{module}</option>
//                 ))}
//               </select>
//             </div>

//             {selectedModule && (
//               <div className="dropdown-container">
//                 <label>Submodules:</label>
//                 <Select
//                   isMulti
//                   options={configFields[0].submodules.map(submodule => ({ value: submodule, label: submodule }))}
//                   value={selectedSubmodules.map(submodule => ({ value: submodule.name, label: submodule.name }))}
//                   onChange={handleSubmoduleSelect}
//                 />
//               </div>
//             )}

//             <button onClick={addSelection}>Add Selection</button>
//           </>
//         )}
//       </div>

//       {/* This section separates the selected data display from the dropdowns */}
//       <div className="selected-data-container">
//         <h1>Selected Data (JSON)</h1>
//         {data.length > 0 ? ( // Only render FieldSelected if data is not empty
//           <FieldSelected data={data} setData={setData} />
//         ) : (
//           <p>No data selected yet.</p> // Optional message when no data is selected
//         )}
//       </div>
//     </div>
//   );
// };

// export default FieldModules;


import React, { useState } from "react";
import Select from 'react-select';
import FieldSelected from "./fieldSelected";
import { configFields } from "../../core/config";
 
const customStyles = {
  control: (provided) => ({
    ...provided,
    boxShadow: 'none',
    border: '1px solid #ccc',
    '&:hover': {
      border: '1px solid #aaa',
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#e0e0e0',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#333',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#d9534f',
    ':hover': {
      backgroundColor: '#d9534f',
      color: 'white',
    },
  }),
};
 
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
<div style={{ display: "flex", height: "100vh" }}>
      {/* Dropdowns Container */}
<div style={{ flex: "1", padding: "20px", backgroundColor: "#f9f9f9", boxSizing: "border-box" }}>
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
                  styles={customStyles}
                />
</div>
            )}
 
            <button onClick={addSelection} style={{ marginTop: "10px" }}>Add Selection</button>
</>
        )}
</div>
 
      {/* Output Container */}
<div style={{ flex: "2", overflowY: "scroll", padding: "20px", boxSizing: "border-box", backgroundColor: "#fff" }}>
        {data.length > 0 && <FieldSelected data={data} setData={setData} />}
</div>
</div>
  );
};
 
export default FieldModules;
