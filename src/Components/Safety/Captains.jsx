import React from 'react'
import safetyFeatures from '../../Assets/safety-features-customer.png'
import captainSafety from '../../Assets/captain-safety.png'

const Captains = () => {
  return (
    <div>
          <div className="safety-img-container">
        <img src={captainSafety} alt="safety-img" className="img-fluid" loading="lazy" />
      </div>
         <div className="safety-img-container mb-4">
        <img src={safetyFeatures} alt="safety-img" className="img-fluid" loading="lazy" />
      </div>
    </div>
  )
}

export default Captains