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
          return null;
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
          const { [key]: _, ...remainingKeys } = hotel;
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

  const removeKeyFromSubmodule = (hotelId, moduleName, submoduleName, key) => {
    const updatedData = data
      .map((hotel) => {
        if (hotel.hotelId === hotelId) {
          return {
            ...hotel,
            modules: hotel.modules.map((mod) => {
              if (mod.name === moduleName) {
                return {
                  ...mod,
                  submodules: mod.submodules.map((sub) => {
                    if (sub.name === submoduleName) {
                      const { [key]: _, ...remainingKeys } = sub;
                      return {
                        ...remainingKeys,
                        name: sub.name,
                      };
                    }
                    return sub;
                  }),
                };
              }
              return mod;
            }),
          };
        }
        return hotel;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  const handleSubmit = () => {
    if (data.length === 0) {
      alert("Please add items to submit!");
      return;
    }

    const textData = JSON.stringify(data, null, 2);
    const blob = new Blob([textData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "selected_data.tsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (data.length === 0) {
    return null;
  }

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
                  <DeleteIcon style={{ fontSize: 18 }} />
                </button>
              </div>

              {Object.keys(hotel)
                .filter(
                  (key) =>
                    !["hotelId", "name", "modules", "title"].includes(key)
                )
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
                    <div key={submoduleIndex} className="submodule-info">
                      <div>
                        {`Submodule: ${submodule.name}`}
                        <button
                          className="remove-btn"
                          onClick={() =>
                            removeItem(
                              hotel.hotelId,
                              module.name,
                              submodule.name
                            )
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
