import React from "react";
import "./styles.scss";

const FieldSelected = ({
  selectedDropdowns,
  setSelectedDropdowns,
  handleSubmit,
}) => {
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

  const handleSubmission = () => {
    if (selectedDropdowns.length === 0) {
      alert("Please add an item to submit!");
    } else {
      handleSubmit();
    }
  };

  const uniqueSelectedDropdowns = [...new Set(selectedDropdowns)];

  return (
    <>
      <div className="field-selected">
        <h1>Selected Dropdowns</h1>
        <ul>
          {uniqueSelectedDropdowns.map((item, index) => (
            <li key={index}>
              {item}
              <button
                onClick={() => handleClose(item)}
                style={{
                  marginRight: "10%",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </>
  );
};

export default FieldSelected;
