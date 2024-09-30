import React, { useState } from 'react'
import HotelConfig from './HotelConfig';
import StyleConfig from './StyleConfig';


function FieldModules() {
  const[isComponentActive,setIsComponentActive]=useState(true);
  
    

const openHotelConfig=()=>{
  
  setIsComponentActive(true);
  
}
const openStyleConfig=()=>{
  
  setIsComponentActive(false);
  
}

  return (
    <div className='configurations'>
      
      <div  className='buttons'>
      
      <button onClick={openStyleConfig}>Style Configuration</button>
      <button onClick={openHotelConfig}>Hotel Configuration</button>
      </div>
      <div className='field-modules-container'>

        {isComponentActive ? <HotelConfig /> : <StyleConfig />}

      </div>

    </div>
  )
}

export default FieldModules