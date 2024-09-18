import React from "react";
import "./styles.scss";
const FieldSelected = ({ selectedDropdowns }) => {
  const handleOnClick = () => {
    alert("Submitted!");
  };
  return (
    <div className="field-selected">
      <h1>Selected Dropdowns</h1>
      <ul>
        {selectedDropdowns.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handleOnClick}>Submit</button>
    </div>
  );
};

export default FieldSelected;
