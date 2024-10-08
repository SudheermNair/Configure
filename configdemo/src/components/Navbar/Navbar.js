import React, { useState } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import "./Navbar.scss";

const languages = [
  "English",
  "Arabic",
  "Spanish",
  "Japanese",
  "French",
  "Catalan",
  "Russian",
];

function Navbar() {
  const [infiniteValue, setInfiniteValue] = useState("");
  const [appConfigValue, setAppConfigValue] = useState("");
  const [countryValue, setCountryValue] = useState("");

  const handleInfiniteChange = (event) => {
    setInfiniteValue(event.target.value);
  };

  const handleAppConfigChange = (event) => {
    setAppConfigValue(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountryValue(event.target.value);
  };

  return (
    <div className="Navbar">
      {/* <div className='dropdownField-container'>
        <FormControl variant="standard" >
          <Select
            className='dropdown-title'
            value={infiniteValue}
            onChange={handleInfiniteChange}
            displayEmpty
            renderValue={(selected) => selected || 'Infinite'}
            sx={{ fontSize: '14px', minWidth: '100px' }}
          >
            <MenuItem value="option2">None</MenuItem>
            <MenuItem value="option1">Infinite</MenuItem>
          </Select>
        </FormControl>

        <span className='separator'>/</span>

        <FormControl variant="standard" >
          <Select
            className='dropdown-title'
            value={infiniteValue}
            onChange={handleInfiniteChange}
            displayEmpty
            renderValue={(selected) => selected || 'Infinite'}
            sx={{ fontSize: '14px', minWidth: '100px' }}
          >
            <MenuItem value="option2">None</MenuItem>
            <MenuItem value="option2">Infinite</MenuItem>
          </Select>
        </FormControl>

        <span className='separator'>/</span>

        <FormControl variant="standard" >
          <Select
            className='dropdown-title'
            value={appConfigValue}
            onChange={handleAppConfigChange}
            displayEmpty
            renderValue={(selected) => selected || 'App Config CMS'}
            sx={{ fontSize: '14px', minWidth: '100px' }}
          >
            <MenuItem value="option2">None</MenuItem>
            <MenuItem value="setting1">App Config CMS</MenuItem>
            <MenuItem value="setting2">App Config Integration</MenuItem>
          </Select>
        </FormControl>
      </div> */}

      {/* <div className="date-container">
        <EventIcon sx={{ verticalAlign: "middle", color: "lightgray" }} />
        <div className="navBar-content">Wednesday, 18th September 2024</div>
      </div>

      <div className="nav-item">
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select
            value={countryValue}
            onChange={handleCountryChange}
            displayEmpty
            renderValue={(selected) => selected || "Language"}
            sx={{
              padding: "10px 8px 10px 0",
              textAlign: "left",
              borderRadius: "12px",
              "& .MuiSelect-select": {
                borderBottom: "none",
                color: "gray",
                fontSize: "14px",
              },
              "&:before, &:after": {
                display: "none",
              },
              "& .MuiSelect-icon": {
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
              },
            }}
          >
            <MenuItem value="">None</MenuItem>
            {languages.sort().map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div> */}

      <div className="nav-item">
        <HelpOutlineIcon sx={{ color: "lightgray" }} />
        <div className="navBar-content">Help</div>
      </div>

      {/* <div className="nav-item">
        <div className="navBar-content">Profile</div>
      </div> */}
    </div>
  );
}

export default Navbar;
