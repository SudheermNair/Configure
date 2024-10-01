import { Select, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { configFields } from "../../core/propValue";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

function StyleConfig() {
  const [styleData] = useState(configFields[0].styles);
  const [fontFamilyList] = useState(configFields[0].fontFamilies);
  const [readMoreConfig] = useState(configFields[0].readMoreCTA);
  const [stylesObject, setStylesObject] = useState({});
  const [styleProperty, setStyleProperty] = useState("");
  const [styleValue, setStyleValue] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const saveStyle = () => {
    if (styleProperty && styleValue) {
      setStylesObject((prevStyles) => ({
        ...prevStyles,
        [styleProperty]: styleValue,
      }));

      setStyleProperty("");
      setSelectedProperty("");
      setStyleValue("");
    }
  };

  const copyObject = () => {
    const textData = JSON.stringify(stylesObject, null, 2);
    navigator.clipboard.writeText(textData).then(() => {
      setCopyButtonText("Copied!");
      console.log(stylesObject);

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
    setSelectedProperty(selectedPropertyValue);
  };

  const saveValue = (e) => {
    let newValue = e.target.value;

    if (styleProperty.includes("opacity")) {
      if (newValue < 0 || newValue > 10) return;
    }

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
  };

  const renderInputFields = () => {
    if (styleProperty.includes("color")) {
      return (
        <>
          <label>Color: </label>
          <input
            type="color"
            value={styleValue}
            onChange={saveValue}
            className="clrPalatte"
          />
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
            id="standard-basic"
            variant="standard"
            type="number"
            value={styleValue.replace(/px|dvh/, "")}
            onChange={saveValue}
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
    <div className="StyleConfig-container">
      <div className="StyleConfig-form">
        <h3>Select Configuration</h3>
        <label>Style property</label>
        <Select
          value={selectedProperty}
          onChange={setStylePropertyValue}
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
        {renderInputFields()}
        <br />
        <button onClick={saveStyle}>Save</button>
      </div>
      {Object.keys(stylesObject).length > 0 ? (
        <>
          <div className="jsonData">
            <div className="headingAndBtn">
            <h3>
              Saved Styles
              <button onClick={copyObject} className="copyBtn">
                {copyButtonText === "Copy" ? <ContentCopyIcon /> : <DoneIcon />}
                {copyButtonText}
              </button>
            </h3></div>
            <pre>{JSON.stringify(stylesObject, null, 2)}</pre>

            <div className="removeOptions">
              {Object.entries(stylesObject).map(([key, value]) => {
                return (
                  <>
                    <div className="removeOptions">
                      <div className="removeOption">
                        <p>
                          {key}: {value}
                        </p>

                        <DeleteIcon
                          className="deleteIcon"
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
                  </>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="StyleConfig-empty"></div>
        </>
      )}
    </div>
  );
}

export default StyleConfig;
