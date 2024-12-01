import React from 'react'
import './toggle.css'

const Toggle = ({toggleActive,setToggleActive}) => {

  return (
    <div className='toggle-container'>
         <span className={`${toggleActive === "Customers" ? 'active-btn' : ''} toggle-btn`} onClick={()=>setToggleActive("Customers")}>Customers</span>
         <span className={`${toggleActive === "Captains" ? 'active-btn' : ''} toggle-btn`}  onClick={()=>setToggleActive("Captains")}>Captains</span>
    </div>
  )
}

export default Toggle