import React from "react";

const FieldSelected = ({ data = [], setData }) => {
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
                    return mod;
                  }
                  return null;
                })
                .filter(Boolean),
            };
          }
          return null;
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

  // If data is empty, do not render anything
  if (data.length === 0) {
    return null;
  }

  return (
    <div className="field-selected">
      <h1>Selected Data 1</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <ul>
        {data?.map((hotel, hotelIndex) => (
          <li key={hotelIndex}>
            <div>
              {`Hotel: ${hotel.name}, ID: ${hotel.hotelId}`}
              <button onClick={() => removeItem(hotel.hotelId)}>
                Remove Hotel
              </button>
            </div>
            {hotel.modules?.map((module, moduleIndex) => (
              <div key={moduleIndex} style={{ marginLeft: "20px" }}>
                {`Module: ${module.name}`}
                <button onClick={() => removeItem(hotel.hotelId, module.name)}>
                  Remove Module
                </button>
                {module.submodules?.map((submodule, subIndex) => (
                  <div key={subIndex} style={{ marginLeft: "40px" }}>
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
