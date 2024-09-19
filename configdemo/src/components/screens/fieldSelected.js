import React from "react";
import "./styles.scss";

const FieldSelected = ({ selectedDropdowns, setSelectedDropdowns }) => {
  const removeModuleAndSubmodules = (module) => {
    const updatedModules = selectedDropdowns.reduce((acc, item) => {
      if (!(item === module || item.startsWith(`${module}:`))) {
        acc.push(item); 
      }
      return acc;
    }, []);

    setSelectedDropdowns(updatedModules);
  };

  const clearAll = () => {
    setSelectedDropdowns([]); 
  };

  const handleClose = (item) => {
    if (item.startsWith("Hotel")) {
      clearAll(); 
    } else {
      removeModuleAndSubmodules(item);
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
  );
};

export default FieldSelected;
