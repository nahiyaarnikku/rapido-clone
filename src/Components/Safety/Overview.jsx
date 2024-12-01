import React from 'react'
import safetyOverviewImage from "../../Assets/safety-overview-header.png";
import coverCustomer from "../../Assets/cover-customer.png"
import coverCaptain from "../../Assets/cover-captain.png"
import safetyFeatures from '../../Assets/safety-features-customer.png'
import safetyForward from '../../Assets/safety_way_forward_overview.png'

const Overview = () => {
  return (
    <div>
        <div className="safety-img-container">
        <img src={safetyOverviewImage} alt="safety-img" className="img-fluid" loading="lazy" />
      </div>
     <div className="row">
        <div className="col">
        <p className='cover-text'>Covers Everyone</p>
        </div>
        <div className="col"></div>
     </div>
      <div className="row">
        <div className="col">
            <img src={coverCustomer} alt="coverCustomer"  className='img-fluid' loading="lazy" />
        </div>
        <div className="col">
        <img src={coverCaptain} alt="coverCustomer"  className='img-fluid' loading="lazy" />
        </div>
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

export default Overview