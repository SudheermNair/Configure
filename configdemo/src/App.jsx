import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import FieldModules from "./components/screens/fieldModules";
import FieldSelected from "./components/screens/fieldSelected";
import { useState } from "react";

function App() {
  const [isConfigActive, setIsConfigActive] = useState(false);
  const [selectedDropdowns, setSelectedDropdowns] = useState([]);
  const [currentView, setCurrentView] = useState("fieldModules");

  const handleSubmit = () => {
    setCurrentView("addConfig");
  };

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
          {currentView === "fieldModules" && (
            <>
              <div className="field-modules-container">
                {isConfigActive && (
                  <>
                    <div>
                      <h1>Configuration</h1>
                      <FieldModules onDropdownChange={handleDropdownChange} />
                    </div>
                    <div>
                      <FieldSelected
                        selectedDropdowns={selectedDropdowns}
                        setSelectedDropdowns={setSelectedDropdowns}
                        handleSubmit={handleSubmit}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
