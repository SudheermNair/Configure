import {
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { configFields } from "../../core/propValue";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear"; // Importing the Clear icon
import "./styles.scss";

function StyleConfig() {
  const [styleData] = useState(configFields[0].styles);
  const [fontFamilyList] = useState(configFields[0].fontFamilies);
  const [readMoreConfig] = useState(configFields[0].readMoreCTA);
  const [stylesObject, setStylesObject] = useState({});
  const [styleProperty, setStyleProperty] = useState("");
  const [styleValue, setStyleValue] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const copyObject = () => {
    const textData = JSON.stringify(stylesObject, null, 2);
    navigator.clipboard.writeText(textData).then(() => {
      setCopyButtonText("Copied!");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 2000);
    });
  };

  const setStylePropertyValue = (e) => {
    const selectedPropertyValue = e.target.value;
    const propertyValue =
      "--" + selectedPropertyValue.toLowerCase().replace(/\s+/g, "-");
    setStyleProperty(propertyValue);
    setSelectedProperty(selectedPropertyValue); // Store the original property value
    setStyleValue("");
  };

  const saveValue = (e) => {
    let newValue = e.target.value;

    if (styleProperty.includes("height")) {
      if (!isNaN(newValue) && newValue !== "") {
        newValue += "dvh";
      } else {
        return;
      }
    } else if (styleProperty.includes("radius")) {
      if (!isNaN(newValue) && newValue !== "") {
        newValue += "px";
      } else {
        return;
      }
    }

    setStyleValue(newValue);
    updateStylesObject(styleProperty, newValue);
  };

  const handleColorChange = (e) => {
    const colorValue = e.target.value;
    setStyleValue(colorValue);
    updateStylesObject(styleProperty, colorValue);
  };
  const formatKey = (key) => {
    return key
      .replace(/^--/, '')
      .replace(/-/g, ' ') 
      .replace(/\b\w/g, (c) => c.toUpperCase()); 
  };
  const handleClickColorBand = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const hue = Math.floor((x / width) * 360);
    const hexColor = hslToHex(hue, 100, 50);
    setStyleValue(hexColor);
    updateStylesObject(styleProperty, hexColor);
  };

  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r, g, b;

    if (h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    const hex =
      (((r + m) * 255) << 16) | (((g + m) * 255) << 8) | ((b + m) * 255);
    return `#${((1 << 24) + hex).toString(16).slice(1).toUpperCase()}`;
  };

  const updateStylesObject = (property, value) => {
    if (property) {
      setStylesObject((prevStyles) => ({
        ...prevStyles,
        [property]: value,
      }));
    }
  };

  const clearTextField = () => {
    setStyleValue("");
    updateStylesObject(styleProperty, "");
  };

  const renderInputFields = () => {
    if (styleProperty.includes("color")) {
      return (
        <>
          <label>Color: </label>
          <input
            type="color"
            value={styleValue}
            onChange={handleColorChange}
            className="clrPalatte"
          />
          <div className="color-slider-container">
            <div
              className="color-band"
              style={{
                background: `linear-gradient(to right, 
                  hsl(0, 100%, 50%),
                  hsl(60, 100%, 50%),
                  hsl(120, 100%, 50%),
                  hsl(180, 100%, 50%),
                  hsl(240, 100%, 50%),
                  hsl(300, 100%, 50%),
                  hsl(360, 100%, 50%))`,
                position: "relative",
                height: "30px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleClickColorBand}
            />
          </div>
          <p>Selected Color Code: {styleValue}</p>
        </>
      );
    }

    if (
      styleProperty.includes("height") ||
      styleProperty.includes("radius") ||
      styleProperty.includes("opacity")
    ) {
      return (
        <>
          <label>Style value</label>
          <TextField
            variant="standard"
            type="number"
            // value={styleValue }
            value={styleValue.replace(/px|dvh/, "")}
            onChange={saveValue}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={clearTextField}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </>
      );
    }

    if (styleProperty.includes("font")) {
      return (
        <>
          <label>Font Family</label>
          <Select value={styleValue} onChange={saveValue} displayEmpty>
            <MenuItem value="" disabled>
              Select a value
            </MenuItem>
            {fontFamilyList.map((fontFamily, index) => (
              <MenuItem key={index} value={fontFamily}>
                {fontFamily}
              </MenuItem>
            ))}
          </Select>
        </>
      );
    }

    if (styleProperty.includes("read")) {
      return (
        <>
          <label>Style value</label>
          <Select value={styleValue} onChange={saveValue} displayEmpty>
            <MenuItem value="" disabled>
              Select a value
            </MenuItem>
            {readMoreConfig.map((displayValue, index) => (
              <MenuItem key={index} value={displayValue}>
                {displayValue}
              </MenuItem>
            ))}
          </Select>
        </>
      );
    }
  };

  return (
    <div className="style-config-container">
      <div className="StyleConfig-form">
        <h3>Select Configuration</h3>

        <div className="dropdown-container">
          <label>Style property </label>
          <Select
            className="submodule-dropdowns"
            value={selectedProperty}
            onChange={setStylePropertyValue}
            displayEmpty
          >
            <option value="" disabled>
              Select a property
            </option>
            {styleData.map((property, index) => (
              <MenuItem key={index} value={property}>
                {property}
              </MenuItem>
            ))}
          </Select>
          <br />
        </div>

        {renderInputFields()}
        <br />
      </div>

      {Object.keys(stylesObject).length > 0 ? (
        <>
          <div className="jsonData">
            <div className="headingAndBtn">
              <h3>
                Saved Styles
                <button onClick={copyObject} className="copyBtn">
                  {copyButtonText === "Copy" ? (
                    <ContentCopyIcon />
                  ) : (
                    <DoneIcon />
                  )}
                  {copyButtonText}
                </button>
              </h3>
            </div>
            <div className="saved-styles">
              <pre>{JSON.stringify(stylesObject, null, 2)}</pre>
            </div>

            <div className="removeOptions deleteIcon">
              {Object.entries(stylesObject).map(([key, value]) => (
                <div className="removeOptions" key={key}>
                  <div className="removeOption">
                    <p>
                    {formatKey(key)}: {value}
                    </p>

                    <DeleteIcon
                      className="delete-btn"
                      onClick={() =>
                        setStylesObject((prevStyles) => {
                          const newStyles = { ...prevStyles };
                          delete newStyles[key];
                          return newStyles;
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="StyleConfig-empty"></div>
      )}
    </div>
  );
}

export default StyleConfig;
