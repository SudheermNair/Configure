import { Select, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { configFields } from "../../core/config";

function StyleConfig() {
  const [styleData] = useState(configFields[0].styles);
  const [stylesObject, setStylesObject] = useState({}); // Store styles as key-value pairs
  const [styleProperty, setStyleProperty] = useState(""); 
  const [styleValue, setStyleValue] = useState(""); 

  
  const saveStyle = () => {
    if (styleProperty && styleValue) {
      setStylesObject((prevStyles) => ({
        ...prevStyles,
        [styleProperty]: styleValue, 
      }));

      
      setStyleProperty("");
      setStyleValue("");
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
      <button onClick={saveStyle}>Save</button>

      <div>
        <h3>Saved Styles:</h3>
        <pre>{JSON.stringify(stylesObject, null, 2)}</pre> 
      </div>
    </div>
  );
}

export default StyleConfig;
