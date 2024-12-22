import React, { useEffect, useState } from 'react';
import { Star } from 'react-feather';
import './CustomerRideEnd.css';
import { json, useLocation } from 'react-router-dom';

const CustomerRideEnd = () => {
  const [rating, setRating] = useState(0);
  const [estimatedFare, setEstimatedFare] = useState(0);
  const location = useLocation();
  const isFromCaptain = location.pathname === '/ride-ended';
  const handleRating = (value) => {
    setRating(value);
  };

  useEffect(() => {
    const rideDetails = JSON.parse(localStorage.getItem('bookedRideDetails'));
    setEstimatedFare(rideDetails?.price)
    console.log(rideDetails);
  }, [])


  return (
    <div className="customer-ride-end">
      <div className="card">
        <h1 className="card-title">Thank You for choosing Rapigo!</h1>
        <p className="thank-you-message">We hope you had a great experience.</p>
        <p className="thank-you-message">Your fare is {estimatedFare ? '$' + estimatedFare : 'Calculating...'}.</p>
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
          {isFromCaptain && (
            <div>
              <button className="home-button" onClick={() => window.location.href = '/captaindashboard'}>Paid via UPI</button>
              <button className="home-button" onClick={() => window.location.href = '/captaindashboard'}>Paid via cash</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CustomerRideEnd;

