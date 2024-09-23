import React, { useState } from "react";
import "./Sidebar.scss";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DiningIcon from "@mui/icons-material/Dining";
import HudiniLogo from "../../assets/images/hudini-logo-black.png";

function Sidebar({ setIsConfigActive }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTileClick = (index) => {
    setActiveIndex(index);
    if (index === 3) {
      setIsConfigActive(true);
    } else {
      setIsConfigActive(false);
    }
  };

  return (
    <div className="Sidebar">
      <div className="image-container">
        <img className="hudini-logo" src={HudiniLogo} alt="logo" />
      </div>
      <ul className="module-list">
        <li
          className={`module-tile ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => handleTileClick(0)}
        >
          <DashboardIcon />
          <p>Dashboard</p>
        </li>
        <li
          className={`module-tile ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => handleTileClick(1)}
        >
          <ApartmentIcon />
          <p>Properties</p>
        </li>
        <li
          className={`module-tile ${activeIndex === 2 ? "active" : ""}`}
          onClick={() => handleTileClick(2)}
        >
          <LocationOnIcon />
          <p>Hotel</p>
        </li>
        <li
          className={`module-tile ${activeIndex === 4 ? "active" : ""}`}
          onClick={() => handleTileClick(4)}
        >
          <AnalyticsIcon />
          <p>Analytics</p>
        </li>
        <li
          className={`module-tile ${activeIndex === 5 ? "active" : ""}`}
          onClick={() => handleTileClick(5)}
        >
          <DiningIcon />
          <p>Services</p>
        </li>
        <li
          className={`module-tile ${activeIndex === 6 ? "active" : ""}`}
          onClick={() => handleTileClick(6)}
        >
          <PersonIcon />
          <p>Users</p>
        </li>
        <li
          className={`module-tile ${activeIndex === 3 ? "active" : ""}`}
          onClick={() => handleTileClick(3)}
        >
          <DataObjectIcon />
          <p>Configurations</p>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
