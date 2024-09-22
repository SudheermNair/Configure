// import React from "react";
// import "./styles.scss";
// const FieldSelected = ({ data = [], setData }) => {
//   const removeItem = (hotelId, moduleName, submoduleName) => {
//     const updatedData = data
//       .map((hotel) => {
//         if (hotel.hotelId === hotelId) {
//           if (moduleName) {
//             return {
//               ...hotel,
//               modules: hotel.modules
//                 ?.map((mod) => {
//                   if (mod.name === moduleName) {
//                     if (submoduleName) {
//                       return {
//                         ...mod,
//                         submodules: mod.submodules.filter(
//                           (sub) => sub.name !== submoduleName
//                         ),
//                       };
//                     }
//                     return mod;
//                   }
//                   return null;
//                 })
//                 .filter(Boolean),
//             };
//           }
//           return null;
//         }
//         return hotel;
//       })
//       .filter(Boolean);

//     setData(updatedData);
//   };

//   const handleSubmit = () => {
//     if (data.length === 0) {
//       alert("Please add items to submit!");
//     } else {
//       alert("Submitted!");
//     }
//   };

//   if (data.length === 0) {
//     return null;
//   }

//   return (
//     <div className="field-selected">
//       <h1>Selected Data</h1>
//       <pre className="selected-json-container">
//         {JSON.stringify(data, null, 2)}
//       </pre>
//       <ul>
//         {data?.map((hotel, hotelIndex) => (
//           <li key={hotelIndex}>
//             <div>
//               {`Hotel: ${hotel.name}, ID: ${hotel.hotelId}`}
//               <button
//                 className="remove-btn"
//                 onClick={() => removeItem(hotel.hotelId)}
//               >
//                 X
//               </button>
//             </div>
//             {hotel.modules?.map((module, moduleIndex) => (
//               <div key={moduleIndex} style={{ marginLeft: "20px" }}>
//                 {`Module: ${module.name}`}
//                 <button
//                   className="remove-btn"
//                   onClick={() => removeItem(hotel.hotelId, module.name)}
//                 >
//                   X
//                 </button>
//                 {module.submodules?.map((submodule, subIndex) => (
//                   <div key={subIndex} style={{ marginLeft: "40px" }}>
//                     {`Submodule: ${submodule.name}`}
//                     <button
//                       onClick={() =>
//                         removeItem(hotel.hotelId, module.name, submodule.name)
//                       }
//                       className="remove-btn"
//                     >
//                       X
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default FieldSelected;

// New Code - Working

// import React from "react";
// import "./styles.scss";

// const FieldSelected = ({ data = [], setData }) => {
//   const removeItem = (hotelId, moduleName, submoduleName) => {
//     const updatedData = data
//       .map((hotel) => {
//         if (hotel.hotelId === hotelId) {
//           if (moduleName) {
//             return {
//               ...hotel,
//               modules: hotel.modules.filter((mod) => mod.name !== moduleName),
//             };
//           }
//           return null; // Removes the entire hotel
//         }
//         return hotel;
//       })
//       .filter(Boolean);

//     setData(updatedData);
//   };

//   const handleSubmit = () => {
//     if (data.length === 0) {
//       alert("No data to submit!");
//       return;
//     }
//     alert("Submitting Data: " + JSON.stringify(data, null, 2));
//   };

//   if (data.length === 0) {
//     return null;
//   }

//   return (
//     <div className="field-selected">
//       <h3>Selected Configurations</h3>
//       <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display JSON-like data */}
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default FieldSelected;

import React from "react";
import "./styles.scss";
import DeleteIcon from "@mui/icons-material/Delete";

const FieldSelected = ({ data = [], setData }) => {
  const removeItem = (hotelId, moduleName, submoduleName) => {
    const updatedData = data
      .map((hotel) => {
        if (hotel.hotelId === hotelId) {
          if (moduleName) {
            if (submoduleName) {
              return {
                ...hotel,
                modules: hotel.modules.map((mod) => {
                  if (mod.name === moduleName) {
                    return {
                      ...mod,
                      submodules: mod.submodules.filter(
                        (sub) => sub.name !== submoduleName
                      ),
                    };
                  }
                  return mod;
                }),
              };
            } else {
              return {
                ...hotel,
                modules: hotel.modules.filter((mod) => mod.name !== moduleName),
              };
            }
          }
          return null; // Remove the entire hotel if no moduleName
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const removeKey = (hotelId, key) => {
    const updatedData = data
      .map((hotel) => {
        if (hotel.hotelId === hotelId) {
          const { [key]: _, ...remainingKeys } = hotel; // Remove the specific key
          return {
            ...remainingKeys,
            hotelId: hotel.hotelId,
            name: hotel.name,
            modules: hotel.modules,
          };
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const handleSubmit = () => {
    if (data.length === 0) {
      alert("No data to submit!");
      return;
    }
    alert("Submitting Data: " + JSON.stringify(data, null, 2));
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="field-selected">
      <h3>Selected Configurations</h3>
      <pre className="selected-json-container">
        {JSON.stringify(data, null, 2)}
      </pre>
      <ul>
        {data.map((hotel, hotelIndex) => (
          <li key={hotelIndex}>
            <div>
              {`Hotel: ${hotel.name}, ID: ${hotel.hotelId}`}
              <button
                className="remove-btn"
                onClick={() => removeItem(hotel.hotelId)}
              >
                <DeleteIcon style={{ fontSize: 18 }} />
              </button>
            </div>
            {hotel.modules.map((module, moduleIndex) => (
              <div key={moduleIndex}>
                <span>{`Module: ${module.name}`}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(hotel.hotelId, module.name)}
                >
                  <DeleteIcon style={{ fontSize: 18 }} />
                </button>
                {module.submodules.map((submodule, submoduleIndex) => (
                  <div key={submoduleIndex}>
                    <span>{`Submodule: ${submodule.name}`}</span>
                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeItem(hotel.hotelId, module.name, submodule.name)
                      }
                    >
                      <DeleteIcon style={{ fontSize: 18 }} />
                    </button>
                  </div>
                ))}
              </div>
            ))}
            {Object.keys(hotel)
              .filter((key) => !["hotelId", "name", "modules"].includes(key))
              .map((key) => (
                <div key={key}>
                  {`${key}: ${hotel[key]}`}
                  <button
                    className="remove-btn"
                    onClick={() => removeKey(hotel.hotelId, key)}
                  >
                    <DeleteIcon style={{ fontSize: 18 }} />
                  </button>
                </div>
              ))}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FieldSelected;
