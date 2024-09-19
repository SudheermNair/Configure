import React from "react";
import "./styles.scss";

const FieldSelected = ({ selectedDropdowns, setSelectedDropdowns }) => {
  const removeModule = (index) => {
    const updatedModules = selectedDropdowns.filter((_, i) => i !== index);
    setSelectedDropdowns(updatedModules);
  };

  return (
    <div className="field-selected">
      <h1>Selected Dropdowns</h1>
      <ul>
        {selectedDropdowns.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeModule(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => alert("Submitted!")}>Submit</button>
    </div>
  );
};

export default FieldSelected;
