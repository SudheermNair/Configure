import React, { useState } from 'react';

const FieldModules = ({ onDropdownChange }) => {
  const [hotel, setHotel] = useState('');
  const [module, setModule] = useState('');
  const [submodule, setSubmodule] = useState('');

  const handleHotelChange = (event) => {
    const value = event.target.value;
    setHotel(value);
    if (value) onDropdownChange(`Hotel: ${value}`);
  };

  const handleModuleChange = (event) => {
    const value = event.target.value;
    setModule(value);
    if (value) onDropdownChange(`Module: ${value}`);
  };

  const handleSubmoduleChange = (event) => {
    const value = event.target.value;
    setSubmodule(value);
    if (value) onDropdownChange(`Submodule: ${value}`);
  };

  return (
    <div className='field-modules'>
      <h1>Configuration</h1>
      <div>
        <label>Hotel:</label>
        <select value={hotel} onChange={handleHotelChange}>
          <option value=''>Select Hotel</option>
          <option value='Hotel 1'>Hotel 1</option>
          <option value='Hotel 2'>Hotel 2</option>
        </select>
      </div>
      <div>
        <label>Modules:</label>
        <select value={module} onChange={handleModuleChange}>
          <option value=''>Select Module</option>
          <option value='Module 1'>Module 1</option>
          <option value='Module 2'>Module 2</option>
        </select>
      </div>
      <div>
        <label>Submodules:</label>
        <select value={submodule} onChange={handleSubmoduleChange}>
          <option value=''>Select Submodule</option>
          <option value='Submodule 1'>Submodule 1</option>
          <option value='Submodule 2'>Submodule 2</option>
        </select>
      </div>
    </div>
  );
};

export default FieldModules;
