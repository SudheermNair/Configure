import React, { useState } from "react";
import "./Sidebar.scss";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DiningIcon from "@mui/icons-material/Dining";
import { Typography } from "@mui/material";

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTileClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="Sidebar">
      <img
        className="hudini-logo"
        src="../assets/images/hudini-logo-black.png"
        alt="logo"
      />
      <ul className="module-list">
        <li
          className={`module-tile ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => handleTileClick(0)}
        >
          <DashboardIcon />
          <Typography variant="body1" className="">
            Dashboard
          </Typography>
        </li>
        <li
          className={`module-tile ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => handleTileClick(1)}
        >
          <ApartmentIcon />
          <Typography variant="body1">Properties</Typography>
        </li>
        <li
          className={`module-tile ${activeIndex === 2 ? "active" : ""}`}
          onClick={() => handleTileClick(2)}
        >
          <LocationOnIcon />
          <Typography variant="body1">Hotel</Typography>
        </li>

        <li
          className={`module-tile ${activeIndex === 4 ? "active" : ""}`}
          onClick={() => handleTileClick(4)}
        >
          <AnalyticsIcon />
          <Typography variant="body1">Analytics</Typography>
        </li>
        <li
          className={`module-tile ${activeIndex === 5 ? "active" : ""}`}
          onClick={() => handleTileClick(5)}
        >
          <DiningIcon />
          <Typography variant="body1">Services</Typography>
        </li>
        <li
          className={`module-tile ${activeIndex === 6 ? "active" : ""}`}
          onClick={() => handleTileClick(6)}
        >
          <PersonIcon />
          <Typography variant="body1">Users</Typography>
        </li>
        <li
          className={`module-tile ${activeIndex === 3 ? "active" : ""}`}
          onClick={() => handleTileClick(3)}
        >
          <DataObjectIcon />
          <Typography variant="body1">Configurations</Typography>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
