import { Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { configFields } from "../../core/config";
import "./styles.scss";

function StyleConfig() {
  const [styleData] = useState(configFields[0].styles);
  const [stylesObject, setStylesObject] = useState({});
  const [styleProperty, setStyleProperty] = useState("");
  const [colorValue, setColorValue] = useState("#050505");
  const [sizeValue, setSizeValue] = useState("");
  const [unit, setUnit] = useState("px"); // Default unit is px

  const updateStyles = (property, sizeValue) => {
    if (property) {
      const formattedProperty = formatProperty(property);
      const valueToSave = isColorProperty(property)
        ? colorValue
        : isFontSizeProperty(property)
        ? `${sizeValue}`
        : "";

      setStylesObject((prevStyles) => ({
        ...prevStyles,
        [formattedProperty]: valueToSave,
      }));
    }
  };

  const handleStylePropertyChange = (property) => {
    setStyleProperty(property);
    updateStyles(property, sizeValue);
  };

  const handleColorChange = (value) => {
    setColorValue((prevColorValue) => {
      // Update styles with the new color, current size, and unit
      updateStyles(styleProperty, sizeValue, prevColorValue, value); // Pass previous and new color
      return value; // Return the new color value
    });
  };
  
  const handleSizeChange = (e) => {
    const value = e.target.value;

    setSizeValue((prevSizeValue) => {
      const newSizeValue = value;
      updateStyles(styleProperty, newSizeValue);
      return newSizeValue;
    });
  };

  const handleUnitChange = (e) => {
    const selectedUnit = e.target.value;
    setUnit(selectedUnit);
    updateStyles(styleProperty, `${sizeValue}${selectedUnit}`);
  };

  const formatProperty = (property) => {
    return `--${property.replace(/\s+/g, "-")}`;
  };

  const isColorProperty = (property) => property.includes("color");
  const isFontSizeProperty = (property) =>
    property.includes("font") ||
    property.includes("border") ||
    property.includes("height") ||
    (property.includes("Opacity") && !property.includes("border color"));

  return (
    <div className="style-config-container">
      <div className="style-config">
        <label>Style property</label>
        <Select
          value={styleProperty}
          onChange={(e) => handleStylePropertyChange(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a property
          </MenuItem>
          {styleData.map((property, index) => (
            <MenuItem key={index} value={property}>
              {property}
            </MenuItem>
          ))}
        </Select>
        <br />

        {isColorProperty(styleProperty) && (
          <>
            <label>Color Picker: </label>
            <input
              type="color"
              value={colorValue}
              onChange={(e) => handleColorChange(e.target.value)}
            />
            <div>Selected Color: {colorValue}</div>
            <br />
          </>
        )}

        {isFontSizeProperty(styleProperty) && (
          <>
            <label>Size</label>
            <input
              type="number"
              value={sizeValue}
              onChange={handleSizeChange}
              placeholder="Enter size"
            />
            <select value={unit} onChange={handleUnitChange}>
              <option value="px">px</option>
              <option value="vh">vh</option>
            </select>
            <div>
              Selected Size: {sizeValue}
              {unit}
            </div>
            <br />
          </>
        )}
      </div>

      <div className="style-selected">
        <h3>Current Styles:</h3>
        <pre>{JSON.stringify(stylesObject, null, 2)}</pre>
      </div>
    </div>
  );
}

export default StyleConfig;
