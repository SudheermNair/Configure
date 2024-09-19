import React from "react";
import "./addConfig.scss";
// import { hotelOptions, moduleOptions } from "../../core/KeyOptions";

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
              <button onClick={() => removeModule(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default SelectConfig;
