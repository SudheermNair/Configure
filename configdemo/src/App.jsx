import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import FieldModules from "./components/screens/fieldModules";
import FieldSelected from "./components/screens/fieldSelected";
import AddConfig from "./components/AddConfig/addConfig";
import SelectConfig from "./components/AddConfig/addConfigSelect";
import { useState } from "react";

function App() {
  const [isConfigActive, setIsConfigActive] = useState(false);
  const [selectedDropdowns, setSelectedDropdowns] = useState([]);

  const handleDropdownChange = (value) => {
    if (!selectedDropdowns.includes(value)) {
      setSelectedDropdowns((prev) => [...prev, value]);
    }
  };

  return (
    <div className="App">
      <div className="information-container">
        <Sidebar setIsConfigActive={setIsConfigActive} />
        <div className="field-container">
        <Navbar />
        <h1>Configuration</h1>
        <div className="field-modules-container">
          {isConfigActive && (
            <>
              <FieldModules onDropdownChange={handleDropdownChange} />
              <FieldSelected selectedDropdowns={selectedDropdowns} 
               setSelectedDropdowns={setSelectedDropdowns} />
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
