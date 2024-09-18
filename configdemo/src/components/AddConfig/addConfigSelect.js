import React from "react";

const ConfigSelect = ({ selectedDropdowns }) => {
  return (
    <div className="field-selected">
      <h1>Selected Dropdowns</h1>
      <ul>
        {selectedDropdowns.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => alert("Submitted!")}>Submit</button>
    </div>
  );
};

export default ConfigSelect;
