import React, { useState } from "react";
import HotelConfig from "./HotelConfig";
import StyleConfig from "./StyleConfig";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ApartmentIcon from "@mui/icons-material/Apartment";

function FieldModules() {
  const [isComponentActive, setIsComponentActive] = useState(true);

  const openHotelConfig = () => {
    setIsComponentActive(true);
  };
  const openStyleConfig = () => {
    setIsComponentActive(false);
  };

  return (
    <div className="configurations">
      <div className=" configurations-container">
        <h1>Configuration</h1>
        <div className="buttons">
          <button
            onClick={openHotelConfig}
            className={isComponentActive ? "btnActive" : "configTile"}
          >
            <ApartmentIcon />
            Hotel{" "}
          </button>
          <button
            onClick={openStyleConfig}
            className={isComponentActive ? "configTile" : "btnActive"}
          >
            <ColorLensIcon />
            Style{" "}
          </button>
        </div>
      </div>
      <div className="field-modules-container">
        {isComponentActive ? <HotelConfig /> : <StyleConfig />}
      </div>
    </div>
  );
}

export default FieldModules;
