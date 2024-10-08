import {
  Autocomplete,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { configFields } from "../../core/propValue";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.scss";

function StyleConfig() {
  const [styleData] = useState(configFields[0].styles);
  const [fontFamilyList] = useState(configFields[0].fontFamilies);
  const [readMoreConfig] = useState(configFields[0].readMoreCTA);
  const [stylesObject, setStylesObject] = useState({});
  const [styleProperties, setStyleProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [styleValue, setStyleValue] = useState("");
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

  const formatKey = (key) => {
    return key
      .replace(/^--/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const saveValue = (e) => {
    let newValue = e.target.value;

    if (
      styleProperties.some((prop) => prop.includes("height")) ||
      styleProperties.some((prop) => prop.includes("radius"))
    ) {
      if (!isNaN(newValue) && newValue !== "") {
        newValue += styleProperties.some((prop) => prop.includes("height"))
          ? "dvh"
          : "px";
      } else {
        return;
      }
    }

    setStyleValue(newValue);
  };

  const handleColorChange = (e) => {
    const colorValue = e.target.value;
    setStyleValue(colorValue);
  };

  const handleClickColorBand = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const hue = Math.floor((x / width) * 360);
    const hexColor = hslToHex(hue, 100, 50);
    setStyleValue(hexColor);
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
    styleProperties.forEach((property) => {
      updateStylesObject(property, "");
    });
  };

  const handlePush = () => {
    if (!styleValue) {
      alert("please select a value");
      return;
    }
    styleProperties.forEach((property) => {
      updateStylesObject(property, styleValue);
    });
    setStyleValue("");
    setSelectedProperties([]);
    setStyleProperties([]);
  };

  const renderInputFields = () => {
    if (styleProperties.some((prop) => prop.includes("color"))) {
      return (
        <>
          <div className="dropdown-label">
            <label>Color: </label>
          </div>
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
        </>
      );
    }

    if (
      styleProperties.some(
        (prop) =>
          prop.includes("height") ||
          prop.includes("radius") ||
          prop.includes("opacity")
      )
    ) {
      return (
        <>
          <div className="formContainer">
            <div className="dropdown-label">
              <label>Value</label>
            </div>
            <TextField
              variant="standard"
              placeholder="Enter value here"
              type="number"
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
          </div>
        </>
      );
    }

    if (styleProperties.some((prop) => prop.includes("font"))) {
      return (
        <>
          <div className="formContainer">
            <div className="dropdown-label">
              <label>Value</label>
            </div>
            <Select
              value={styleValue}
              onChange={saveValue}
              displayEmpty
              variant="standard"
            >
              <MenuItem value="" disabled>
                Select font families
              </MenuItem>
              {fontFamilyList.map((fontFamily, index) => (
                <MenuItem key={index} value={fontFamily}>
                  {fontFamily}
                </MenuItem>
              ))}
            </Select>
          </div>
        </>
      );
    }

    if (styleProperties.some((prop) => prop.includes("read"))) {
      return (
        <>
          <div className="formContainer">
            <div className="dropdown-label">
              <label>Value</label>
            </div>
            <Select
              value={styleValue}
              onChange={saveValue}
              displayEmpty
              variant="standard"
            >
              <MenuItem value="" disabled>
                Select a value
              </MenuItem>
              {readMoreConfig.map((displayValue, index) => (
                <MenuItem key={index} value={displayValue}>
                  {displayValue}
                </MenuItem>
              ))}
            </Select>
          </div>
        </>
      );
    }
    return null;
  };

  const groupStylesByKeyword = (styles) => {
    const groupedStyles = {};

    Object.entries(styles).forEach(([key, value]) => {
      let keyword;
      if (key.includes("color")) keyword = "Color";
      else if (key.includes("font")) keyword = "Font";
      else if (key.includes("height") || key.includes("radius"))
        keyword = "Dimension";
      else if (key.includes("opacity")) keyword = "Opacity";
      else keyword = "Other";

      if (!groupedStyles[keyword]) {
        groupedStyles[keyword] = [];
      }
      groupedStyles[keyword].push({ key, value });
    });

    return groupedStyles;
  };

  const groupedStyles = groupStylesByKeyword(stylesObject);

  return (
    <div className="style-config-container">
      <div className="StyleConfig-form">
        <h3>Select Styles</h3>

        <div className="formContainer">
          <div className="dropdown-label">
            <label>Property </label>
          </div>
          <div className="dropdown-container">
            <Autocomplete
              multiple
              className="properties-dropdown"
              options={styleData}
              getOptionLabel={(option) => option}
              value={selectedProperties}
              onChange={(event, newValue) => {
                setSelectedProperties(newValue);
                const propertyValues = newValue.map(
                  (prop) => "--" + prop.toLowerCase().replace(/\s+/g, "-")
                );
                setStyleProperties(propertyValues);
                setStyleValue("");
              }}
              filterOptions={(options, { inputValue }) => {
                const containsColor = selectedProperties.some((prop) =>
                  prop.includes("Color")
                );
                const containHeight = selectedProperties.some((prop) =>
                  prop.includes("Height")
                );
                const containRadius = selectedProperties.some((prop) =>
                  prop.includes("Radius")
                );
                const containOpacity = selectedProperties.some((prop) =>
                  prop.includes("Opacity")
                );
                const containFont = selectedProperties.some((prop) =>
                  prop.includes("Font")
                );

                let filteredOptions =
                  selectedProperties.length === 0 ? options : [];

                if (containsColor) {
                  filteredOptions = options.filter((option) =>
                    option.includes("Color")
                  );
                }
                if (containHeight) {
                  filteredOptions = options.filter((option) =>
                    option.includes("Height")
                  );
                }
                if (containRadius) {
                  filteredOptions = options.filter((option) =>
                    option.includes("Radius")
                  );
                }
                if (containOpacity) {
                  filteredOptions = options.filter((option) =>
                    option.includes("Opacity")
                  );
                }
                if (containFont) {
                  filteredOptions = options.filter((option) =>
                    option.includes("Font")
                  );
                }

                return filteredOptions.filter((option) =>
                  option.toLowerCase().includes(inputValue.toLowerCase())
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="    Select properties"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                  }}
                  sx={{ width: "245px" }}
                />
              )}
              renderTags={(value, getTagProps) => (
                <div className="selected-properties">
                  {value.map((option, index) => (
                    <span {...getTagProps({ index })} className="selected-tag">
                      {option}
                      <IconButton
                        size="small"
                        onClick={() => {
                          const newSelected = selectedProperties.filter(
                            (_, i) => i !== index
                          );
                          setSelectedProperties(newSelected);
                          const newPropertyValues = newSelected.map(
                            (prop) =>
                              "--" + prop.toLowerCase().replace(/\s+/g, "-")
                          );
                          setStyleProperties(newPropertyValues);
                        }}
                        style={{ padding: "0", minWidth: "0" }}
                      >
                        <CloseIcon
                          style={{
                            fontSize: "14px",
                            color: "red",
                            padding: "4px",
                          }}
                        />
                      </IconButton>
                    </span>
                  ))}
                </div>
              )}
            />
            <br />
          </div>
        </div>

        {renderInputFields()}
        <br />

        <div className="button-container">
          <button onClick={handlePush} className="push-button">
            ADD
          </button>
        </div>
      </div>

      {Object.keys(stylesObject).length > 0 ? (
        <>
          <div className="jsonData">
            <div className="headingAndBtn">
              <h3>
                Selected Styles{" "}
                <button onClick={copyObject} className="copyBtn">
                  {copyButtonText === "Copy" ? (
                    <ContentCopyIcon style={{ fontSize: 18 }} />
                  ) : (
                    <DoneIcon style={{ fontSize: 18 }} />
                  )}
                  {/* {copyButtonText} */}
                </button>
              </h3>
            </div>

            <div className="removeOptions deleteIcon">
              {Object.entries(groupedStyles).map(([keyword, styles]) => (
                <div key={keyword}>
                  <h4>{keyword}</h4>
                  {styles.map(({ key, value }) => (
                    <div className="removeOption" key={key}>
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
                  ))}
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
