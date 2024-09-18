
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <div className='information-container' >
      <Sidebar/>
      <Navbar/>
      </div>
    </div>
  );
}

export default App;
