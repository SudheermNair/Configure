// import React from 'react';
// import './styles.scss';
// import DeleteIcon from '@mui/icons-material/Delete';

// const FieldSelected = ({ data = [], setData }) => {
//   const removeItem = (hotelId, moduleName, submoduleName) => {
//     const updatedData = data
//       .map((hotel) => {
//         if (hotel.hotelId === hotelId) {
//           if (moduleName) {
//             if (submoduleName) {
//               return {
//                 ...hotel,
//                 modules: hotel.modules.map((mod) => {
//                   if (mod.name === moduleName) {
//                     return {
//                       ...mod,
//                       submodules: mod.submodules.filter(
//                         (sub) => sub.name !== submoduleName
//                       ),
//                     };
//                   }
//                   return mod;
//                 }),
//               };
//             } else {
//               return {
//                 ...hotel,
//                 modules: hotel.modules.filter((mod) => mod.name !== moduleName),
//               };
//             }
//           }
//           return null;
//         }
//         return hotel;
//       })
//       .filter(Boolean);

//     setData(updatedData);
//   };

//   const removeKey = (hotelId, key) => {
//     const updatedData = data
//       .map((hotel) => {
//         if (hotel.hotelId === hotelId) {
//           const { [key]: _, ...remainingKeys } = hotel;
//           return {
//             ...remainingKeys,
//             hotelId: hotel.hotelId,
//             name: hotel.name,
//             modules: hotel.modules,
//           };
//         }
//         return hotel;
//       })
//       .filter(Boolean);

//     setData(updatedData);
//   };

//   const handleSubmit = () => {
//     if (data.length === 0) {
//       alert('Please add items to submit!');
//     } else {
//       alert('Submitted!');
//     }
//   };

//   if (data.length === 0) {
//     return null;
//   }

//   return (
//     <div className="field-selected">
//       <h1>Selected Configuration</h1>
//       <pre className="selected-json-container">
//         {JSON.stringify(data, null, 2)}
//       </pre>
//       <ul>
//         {data.map((hotel, hotelIndex) => (
//           <li key={hotelIndex}>
//             <div>
//               {`Hotel: ${hotel.name}, ID: ${hotel.hotelId}`}
//               <button
//                 className="remove-btn"
//                 onClick={() => removeItem(hotel.hotelId)}
//               >
//                 <DeleteIcon style={{ fontSize: 18 }} />
//               </button>
//             </div>
//             {hotel.modules.map((module, moduleIndex) => (
//               <div key={moduleIndex}>
//                 <span>{`Module: ${module.name}`}</span>
//                 <button
//                   className="remove-btn"
//                   onClick={() => removeItem(hotel.hotelId, module.name)}
//                 >
//                   <DeleteIcon style={{ fontSize: 18 }} />
//                 </button>
//                 {module.submodules.map((submodule, submoduleIndex) => (
//                   <div key={submoduleIndex}>
//                     <span>{`Submodule: ${submodule.name}`}</span>
//                     <button
//                       className="remove-btn"
//                       onClick={() =>
//                         removeItem(hotel.hotelId, module.name, submodule.name)
//                       }
//                     >
//                       <DeleteIcon style={{ fontSize: 18 }} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ))}
//             {Object.keys(hotel)
//               .filter((key) => !['hotelId', 'name', 'modules'].includes(key))
//               .map((key) => (
//                 <div key={key}>
//                   {`${key}: ${hotel[key]}`}
//                   <button
//                     className="remove-btn"
//                     onClick={() => removeKey(hotel.hotelId, key)}
//                   >
//                     <DeleteIcon style={{ fontSize: 18 }} />
//                   </button>
//                 </div>
//               ))}
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default FieldSelected;
import React from 'react';
import './styles.scss';
import DeleteIcon from '@mui/icons-material/Delete';

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
          return null;
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const removeKey = (hotelId, moduleName, submoduleName, key) => {
    const updatedData = data
      .map((hotel) => {
        if (hotel.hotelId === hotelId) {
          if (moduleName) {
            return {
              ...hotel,
              modules: hotel.modules.map((mod) => {
                if (mod.name === moduleName) {
                  if (submoduleName) {
                    return {
                      ...mod,
                      submodules: mod.submodules.map((sub) => {
                        if (sub.name === submoduleName) {
                          const { [key]: _, ...remainingKeys } = sub;
                          return remainingKeys; // Return the updated submodule without the key
                        }
                        return sub;
                      }),
                    };
                  } else {
                    const { [key]: _, ...remainingKeys } = mod;
                    return {
                      ...remainingKeys,
                      name: mod.name,
                      submodules: mod.submodules,
                    }; // Return the updated module without the key
                  }
                }
                return mod;
              }),
            };
          }
          const { [key]: _, ...remainingKeys } = hotel;
          return {
            ...remainingKeys,
            hotelId: hotel.hotelId,
            name: hotel.name,
            modules: hotel.modules,
          }; // Return the updated hotel without the key
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const handleSubmit = () => {
    if (data.length === 0) {
      alert('Please add items to submit!');
    } else {
      alert('Submitted!');
    }
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="field-selected">
      <h1>Selected Configuration</h1>
      <pre className="selected-json-container">
        {JSON.stringify(data, null, 2)}
      </pre>
      <ul>
        {data.map((hotel) => (
          <li key={hotel.hotelId}>
            <div>
              {`Hotel: ${hotel.name}, ID: ${hotel.hotelId}`}
              <button
                className="remove-btn"
                onClick={() => removeItem(hotel.hotelId)}
              >
                <DeleteIcon style={{ fontSize: 18 }} />
              </button>
            </div>
            {hotel.modules.map((module) => (
              <div key={module.name}>
                <span>{`Module: ${module.name}`}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(hotel.hotelId, module.name)}
                >
                  <DeleteIcon style={{ fontSize: 18 }} />
                </button>
                {module.submodules.map((submodule) => (
                  <div key={submodule.name}>
                    <span>{`Submodule: ${submodule.name}`}</span>
                    {Object.keys(submodule)
                      .filter((key) => key !== 'name') // Exclude the submodule name
                      .map((key) => (
                        <div key={key}>
                          {`${key}: ${submodule[key]}`}
                          <button
                            className="remove-btn"
                            onClick={() =>
                              removeKey(hotel.hotelId, module.name, submodule.name, key)
                            }
                          >
                            <DeleteIcon style={{ fontSize: 18 }} />
                          </button>
                        </div>
                      ))}
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
              .filter((key) => !['hotelId', 'name', 'modules'].includes(key))
              .map((key) => {
                const value = hotel[key];
                return (
                  <div key={key}>
                    {value !== undefined ? `${key}: ${value}` : null}
                    {value !== undefined && (
                      <button
                        className="remove-btn"
                        onClick={() => removeKey(hotel.hotelId, null, null, key)}
                      >
                        <DeleteIcon style={{ fontSize: 18 }} />
                      </button>
                    )}
                  </div>
                );
              })}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FieldSelected;
