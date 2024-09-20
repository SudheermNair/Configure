import React from "react";
import "./styles.scss";

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
          return null; // Remove hotel if no module is selected
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
          const { [key]: _, ...remainingKeys } = hotel; // Destructure to remove the key
          return {
            ...remainingKeys,
            hotelId: hotel.hotelId, // Preserve the hotelId
            name: hotel.name, // Preserve the hotel name
            modules: hotel.modules, // Preserve modules
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
    } else {
      alert("Submitted!");
    }
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="field-selected">
      <h1>Selected Data</h1>
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
                X
              </button>
            </div>
            {hotel.modules.map((module, moduleIndex) => (
              <div key={moduleIndex}>
                <span>{`Module: ${module.name}`}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(hotel.hotelId, module.name)}
                >
                  X
                </button>
                {module.submodules.map((submodule, submoduleIndex) => (
                  <div key={submoduleIndex}>
                    <span>{`Submodule: ${submodule.name}`}</span>
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
                      X
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
                    X
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
