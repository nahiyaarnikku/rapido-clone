import React from 'react'
import customerSafety from '../../Assets/customer-safety.png'
import capVerification from '../../Assets/captain-verification.png'
import safetyFeatures from '../../Assets/safety-features-customer.png'
import safetyForward from '../../Assets/safety_way_forward_overview.png'
const Cutomers = () => {
  return (
    <div>

        <div className="safety-img-container">
        <img src={customerSafety} alt="safety-img" className="img-fluid" loading="lazy" />
      </div>
      <div className="safety-img-container">
        <img src={capVerification} alt="safety-img" className="img-fluid" loading="lazy" />
      </div>
      <div className="safety-img-container">
        <img src={safetyFeatures} alt="safety-img" className="img-fluid" loading="lazy" />
      </div>
      <div className="safety-img-container">
        <img src={safetyForward} alt="safety-img" className="img-fluid" loading="lazy" />
      </div>
    </div>
  )
}

export default Cutomers