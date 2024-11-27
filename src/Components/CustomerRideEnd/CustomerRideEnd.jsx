import React from 'react';
import { MapPin, Clock, CreditCard, Star, ThumbsUp } from 'react-feather';
import './AfterRideEnd.css';

const AfterRideEnd = ({ rideDetails }) => {
  const {
    captainName,
    captainRating,
    pickup,
    dropoff,
    distance,
    duration,
    baseFare,
    distanceFare,
    totalFare
  } = rideDetails;

  return (
    <div className="after-ride-end">
      <div className="ride-summary">
        <h1>Ride Completed</h1>
        <div className="route-info">
          <div className="location">
            <MapPin className="icon" />
            <div>
              <p className="label">Pickup</p>
              <p>{pickup}</p>
            </div>
          </div>
          <div className="location">
            <MapPin className="icon" />
            <div>
              <p className="label">Drop-off</p>
              <p>{dropoff}</p>
            </div>
          </div>
        </div>
        <div className="ride-stats">
          <div className="stat">
            <Clock className="icon" />
            <p>{duration}</p>
          </div>
          <div className="stat">
            <MapPin className="icon" />
            <p>{distance} km</p>
          </div>
        </div>
      </div>

      <div className="fare-breakdown">
        <h2>Fare Breakdown</h2>
        <div className="fare-item">
          <span>Base Fare</span>
          <span>₹{baseFare.toFixed(2)}</span>
        </div>
        <div className="fare-item">
          <span>Distance Fare</span>
          <span>₹{distanceFare.toFixed(2)}</span>
        </div>
        <div className="fare-item total">
          <span>Total Fare</span>
          <span>₹{totalFare.toFixed(2)}</span>
        </div>
      </div>

      <div className="payment-section">
        <h2>Payment</h2>
        <button className="pay-button">
          <CreditCard className="icon" />
          Pay ₹{totalFare.toFixed(2)}
        </button>
      </div>

      <div className="captain-rating">
        <h2>Rate your ride with Captain {captainName}</h2>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`star ${star <= captainRating ? 'filled' : ''}`}
            />
          ))}
        </div>
        <button className="tip-button">
          <ThumbsUp className="icon" />
          Add Tip
        </button>
      </div>
    </div>
  );
};

export default AfterRideEnd;