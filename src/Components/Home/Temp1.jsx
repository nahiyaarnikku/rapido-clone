import React from 'react'
import './home.css'

const Temp1 = ({img1,img2}) => {
  return (
    <div>
        <div className="know-img-container mb-2">
            <div className="container">
              <div className="know-img-1">
                <img src={img1} alt="who_we_1" className="w-100 h-100" loading="lazy" />
              </div>
              <div className="design-1"></div>
            </div>
            <div className="container">
              <div className="design-2"></div>
              <div className="know-img-2">
                <img src={img2} alt="who_we_1"  className="w-100 h-100" loading="lazy" />
              </div>
            </div>
          </div>
    </div>
  )
}

export default Temp1