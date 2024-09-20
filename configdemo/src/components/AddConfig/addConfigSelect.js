import React from "react";
import "./addConfig.scss";

const SelectConfig = ({ selectedDropdowns, setSelectedDropdowns }) => {
  const removeModule = (index) => {
    const updatedModules = selectedDropdowns.filter((_, i) => i !== index);
    setSelectedDropdowns(updatedModules);
  };

  const handleSubmit = () => {
    if (selectedDropdowns.length === 0) {
      alert("please add item to submit!");
    } else {
      removeModule();
    }
  };

  const UniqueselectedDropdowns = [...new Set(selectedDropdowns)];

  return (
    <>
      <div className="field-selected">
        <h1>Selected Dropdowns</h1>
        <ul>
          {UniqueselectedDropdowns.map((item, index) => (
            <li key={index}>
              {item}
              <button
                style={{
                  marginRight: "10%",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => removeModule(index)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default SelectConfig;
