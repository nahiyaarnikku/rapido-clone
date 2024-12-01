 import React from 'react'
import './toggle.css'

const Desc = ({desc}) => {
  return (
    <div className='desc-container'>
      {desc && desc.map((descData) => (
        <div className="desc-box" key={descData.id} data-aos="zoom-in" data-aos-duration="1000" > 
        <img src={descData.image} alt="desc-img" className='desc-img' loading="lazy" />
         <h5>{descData.head}</h5>
         <p>{descData.p}</p>
         </div>
      ))}
    </div>
  )
}

export default Desc