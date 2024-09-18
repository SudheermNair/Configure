import React from 'react';

const Sidebar = ({ setActiveComponent }) => {
  const handleConfigClick = () => {
    setActiveComponent('Configuration');
  };

  return (
    <div className='sidebar'>
      <button onClick={handleConfigClick}>Configuration</button>
      {/* You can add more buttons here if needed */}
    </div>
  );
};

export default Sidebar;
