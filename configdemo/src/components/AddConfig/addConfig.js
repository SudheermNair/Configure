import React, { useState } from "react";
import "./addConfig.scss";
import { hotelOptions, moduleOptions } from "../../core/KeyOptions";

const initialData = {
  keys: [],
};

const AddConfig = ({ onDropdownChange }) => {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState({
    key: "",
    value: "",
  });

  const handleDropdownChange = (dropdown, value) => {
    setSelected((prevState) => ({
      ...prevState,
      [dropdown]: value,
    }));

    if (value) {
      onDropdownChange(
        `${dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}: ${value}`
      );
    }
  };

  const addKey = (keyName) => {
    if (keyName && !data.keys.find((k) => k.name === keyName)) {
      setData((prevData) => {
        const newData = {
          ...prevData,
          keys: [...prevData.keys, { name: keyName, values: [] }],
        };
        console.log(newData);
        return newData;
      });
    }
  };

  const addValue = (valueName) => {
    const { key } = selected;
    if (key && valueName) {
      const keyData = data.keys.find((k) => k.name === key);
      if (keyData && !keyData.values.includes(valueName)) {
        setData((prevData) => {
          const updatedKeys = prevData.keys.map((k) => {
            if (k.name === key) {
              return {
                ...k,
                values: [...k.values, valueName],
              };
            }
            return k;
          });
          const newData = { ...prevData, keys: updatedKeys };
          console.log(newData);
          return newData;
        });
        handleDropdownChange("value", valueName);
      }
    }
  };

  const availableKeys = hotelOptions;
  const selectedKeys = data.keys.map((k) => k.name);
  const availableValues = selected.key
    ? moduleOptions.filter(
        (m) =>
          !data.keys.find((k) => k.name === selected.key)?.values.includes(m)
      )
    : [];

  return (
    <div className="field-modules">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="dropdown-container">
          <label>Key:</label>
          <select
            value={selected.key}
            onChange={(event) => {
              const value = event.target.value;
              handleDropdownChange("key", value);
              addKey(value);
            }}
            disabled={!!selected.key}
          >
            <option value="" className="dropdown-label">
              Select Key
            </option>
            {availableKeys
              .filter((k) => !selectedKeys.includes(k))
              .map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Value:</label>
          <select
            value={selected.value}
            onChange={(event) => {
              const value = event.target.value;
              handleDropdownChange("value", value);
              addValue(value);
            }}
            disabled={!selected.key || availableValues.length === 0}
          >
            <option value="">Select Value</option>
            {availableValues.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default AddConfig;
