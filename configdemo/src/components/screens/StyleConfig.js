import { Select, MenuItem, TextField, Slider, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { configFields } from "../../core/config";

function StyleConfig() {
  const [styleData] = useState(configFields[0].styles);
  const [stylesObject, setStylesObject] = useState({});
  const [styleProperty, setStyleProperty] = useState("");
  const [styleValue, setStyleValue] = useState("");
  const [colorValue, setColorValue] = useState("#000000"); // Default color
  const [sizeValue, setSizeValue] = useState(16); // Default size (font size, border size, etc.)

  const saveStyle = () => {
    if (styleProperty && (styleValue || colorValue || sizeValue)) {
      setStylesObject((prevStyles) => ({
        ...prevStyles,
        [styleProperty]: styleValue || colorValue || `${sizeValue}px`, 
      }));

      setStyleProperty("");
      setStyleValue("");
      setColorValue("#000000"); // Reset to default color
      setSizeValue(16); // Reset to default size
    }
  };

  return (
    <div>
      <label>Style property</label>
      <Select
        value={styleProperty}
        onChange={(e) => setStyleProperty(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>Select a property</MenuItem>
        {styleData.map((property, index) => (
          <MenuItem key={index} value={property}>
            {property}
          </MenuItem>
        ))}
      </Select>
      <br />

      <label>Style value</label>
      <TextField
        id="standard-basic"
        label="Property Value"
        variant="standard"
        value={styleValue}
        onChange={(e) => setStyleValue(e.target.value)}
      />
      <br />

      <label>Color Picker</label>
      <input
        type="color"
        value={colorValue}
        onChange={(e) => setColorValue(e.target.value)}
      />
      <br />

      <label>Size (px)</label>
      <Slider
        value={sizeValue}
        onChange={(e, newValue) => setSizeValue(newValue)}
        aria-labelledby="size-slider"
        min={1}
        max={100}
        valueLabelDisplay="auto"
      />
      <br />

      <Button variant="contained" onClick={saveStyle}>
        Save
      </Button>

      <div>
        <h3>Saved Styles:</h3>
        <pre>{JSON.stringify(stylesObject, null, 2)}</pre>
      </div>
    </div>
  );
}

export default StyleConfig;
