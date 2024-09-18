import React from 'react';

const Sidebar = ({ setIsConfigActive }) => {
  const handleConfigClick = () => {
    setIsConfigActive((prev) => !prev); // Toggle visibility
  };

  return (
    <div className='sidebar'>
      <button onClick={handleConfigClick}>Configuration</button>
    </div>
  );
};

export default Sidebar;
