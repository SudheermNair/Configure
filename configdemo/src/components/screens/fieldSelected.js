import React from "react";
import "./styles.scss";

const FieldSelected = ({ data = [], setData }) => {
  const removeItem = (hotelId, moduleName, submoduleName) => {
    const updatedData = data
      .map((hotel) => {
        if (hotel.hotelId === hotelId) {
          if (moduleName) {
            return {
              ...hotel,
              modules: hotel.modules.filter((mod) => mod.name !== moduleName),
            };
          }
          return null; // Removes the entire hotel
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
      <h3>Selected Data</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display JSON-like data */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FieldSelected;
