import React from "react";
import "./styles.scss";

const FieldSelected = ({ selectedDropdowns, setSelectedDropdowns }) => {
  const removeModule = (index) => {
    const updatedModules = selectedDropdowns.filter((_, i) => i !== index);
    setSelectedDropdowns(updatedModules);
  };

  const clearAll = () => {
    setSelectedDropdowns([]);
  };

  const handleClose = (item) => {
    if (item.startsWith("Hotel")) {
      clearAll();
    } else {
      removeModule(selectedDropdowns.indexOf(item));
    }
  };

  const handleSubmit = () => {
    if (selectedDropdowns.length === 0) {
      alert("Please add an item to submit!");
    } else {
      alert("Submitted!");
    }
  };

  const uniqueSelectedDropdowns = [...new Set(selectedDropdowns)];

  return (

    <div className="field-selected">
      <h1>Selected Dropdowns</h1>
      <ul>
        {uniqueSelectedDropdowns.map((item, index) => (
          <li key={index}>
            {item}
            <button
              onClick={() => handleClose(item)}
              style={{ marginRight: "10%", border: "none", cursor: "pointer" }}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    <>
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
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default FieldSelected;
