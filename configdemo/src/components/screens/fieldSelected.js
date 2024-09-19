import React from "react";

const FieldSelected = ({ data = [], setData }) => {
  const removeItem = (hotelId, moduleName, submoduleName) => {
    const updatedData = data.map((hotel) => {
      if (hotel.hotelId === hotelId) {
        // If a module name is provided, remove the module
        if (moduleName) {
          return {
            ...hotel,
            modules: hotel.modules?.filter((mod) => mod.name !== moduleName), // Remove module
          };
        }
        return null; // Only return hotel if specified
      }
      return hotel; // Return unchanged hotel
    }).filter(Boolean); // Remove any null hotels

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
    return null; // Render nothing if no data
  }

  return (
    <div className="field-selected">
      <h1>Selected Data </h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the JSON data here */}
      <ul>
        {data.map((hotel, hotelIndex) => (
          <li key={hotelIndex}>
            <div>
              {`Hotel: ${hotel.name}, ID: ${hotel.hotelId}`}
              <button onClick={() => removeItem(hotel.hotelId)}>Remove Hotel</button>
            </div>
            {hotel.modules?.map((module, moduleIndex) => (
              <div key={moduleIndex} style={{ marginLeft: "20px" }}>
                {`Module: ${module.name}`}
                <button onClick={() => removeItem(hotel.hotelId, module.name)}>Remove Module</button>
                {module.submodules?.map((submodule, subIndex) => (
                  <div key={subIndex} style={{ marginLeft: "40px" }}>
                    {`Submodule: ${submodule.name}`}
                    <button
                      onClick={() => removeItem(hotel.hotelId, module.name, submodule.name)}
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
