  import React from "react";

  const FieldSelected = ({ data = [], setData, handleSubmit }) => {
    const removeItem = (hotelId, moduleName, submoduleName) => {
      const updatedData = data
        .map((hotel) => {
          if (hotel.hotelId === hotelId) {
            if (moduleName) {
              return {
                ...hotel,
                modules: hotel.modules
                  ?.map((mod) => {
                    if (mod.name === moduleName) {
                      if (submoduleName) {
                        return {
                          ...mod,
                          submodules: mod.submodules.filter(
                            (sub) => sub.name !== submoduleName
                          ),
                        };
                      }
                      // Return null to indicate we want to remove the entire module
                      return null;
                    }
                    return mod; // Keep the module if it's not the one being removed
                  })
                  .filter(Boolean), // Filter out null values (removed modules)
              };
            }
            // Return null to indicate we want to remove the entire hotel
            return null;
          }
          return hotel; // Keep other hotels
        })
        .filter(Boolean); // Filter out null values (removed hotels)

      setData(updatedData);
    };

    const clearAll = () => {
      setData([]); // Assuming you want to clear all data
    };

    return (
      <div className="field-selected">
        <h1>Selected Data (JSON)</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>{" "}
        {/* Display the JSON data here */}
        <ul>
          {data.map((hotel) => (
            <li key={hotel.hotelId}>
              <div>
                {`Hotel: ${hotel.name}, ID: ${hotel.hotelId}`}
                <button onClick={() => clearAll()}>Remove Hotel</button>
              </div>
              {hotel.modules?.map((module) => (
                <div key={module.name} style={{ marginLeft: "20px" }}>
                  {`Module: ${module.name}`}
                  <button
                    onClick={() => removeItem(hotel.hotelId, module.name)}
                  >
                    Remove Module
                  </button>
                  {module.submodules?.map((submodule) => (
                    <div key={submodule.name} style={{ marginLeft: "40px" }}>
                      {`Submodule: ${submodule.name}`}
                      <button
                        onClick={() =>
                          removeItem(hotel.hotelId, module.name, submodule.name)
                        }
                      >
                        Remove Submodule
                      </button>
                    </div>
                  ))}
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
