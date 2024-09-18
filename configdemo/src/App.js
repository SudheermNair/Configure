import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AddConfig from "./components/AddConfig/addConfig";

function App() {
  return (
    <div className="App">
      <div className="information-container">
        <Sidebar />
        <Navbar />
      </div>
      <AddConfig />
    </div>
  );
}

export default App;
