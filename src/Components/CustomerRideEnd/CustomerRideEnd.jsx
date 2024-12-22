import React, { useState } from 'react';
import { Star } from 'react-feather';
import './CustomerRideEnd.css';
import rideRequested from 'D:/myApp/rapido-clone/src/Components/CaptainRideRequest/CaptainRideRequest.jsx';

const CustomerRideEnd = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="customer-ride-end">
      <div className="card">
        <h1 className="card-title">Thank You for choosing Rapigo!</h1>
        <p className="thank-you-message">We hope you had a great experience.</p>
        <p className="thank-you-message">Your fare is {rideRequested.estimatedFare}.</p>
        <div className="rating-section">
          <h2 className="rating-title">How was your ride?</h2>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => handleRating(star)}
              />
            ))}
          </div>
          {rating > 0 && (
            <p className="rating-feedback">
              You rated your ride {rating} {rating === 1 ? 'star' : 'stars'}. Thank you for your feedback!
            </p>
          )}
          <button className="home-button" onClick={() => window.location.href = '/captaindashboard'}>Paid via UPI</button>
          <button className="home-button" onClick={() => window.location.href = '/captaindashboard'}>Paid via cash</button>

        </div>
      </div>
    </div>
  );
};

export default CustomerRideEnd;

