import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import FieldModules from "./components/screens/fieldModules";
import FieldSelected from "./components/screens/fieldSelected";
import { useState } from "react";

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedDropdowns, setSelectedDropdowns] = useState([]);

  const handleDropdownChange = (value) => {
    setSelectedDropdowns((prev) => [...prev, value]);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Sidebar setActiveComponent={setActiveComponent} />
        <div className="field-modules-container">
          {activeComponent === "Configuration" && (
            <FieldModules onDropdownChange={handleDropdownChange} />
          )}
          <FieldSelected selectedDropdowns={selectedDropdowns} />
        </div>
      </div>
    </div>
  );
}

export default App;
