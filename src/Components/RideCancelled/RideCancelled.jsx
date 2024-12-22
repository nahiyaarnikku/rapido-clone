import React from 'react';
import { X, AlertCircle, ChevronLeft, RefreshCw } from 'react-feather';
import './RideCancelled.css';
import { useNavigate } from 'react-router-dom';

const RideCancelled = ({ onGoBack, onRebook }) => {
  const naviagte = useNavigate();
  const handleRebook = ()=>{
    naviagte('/route-planner');
  }
  return (
    <div className="ride-cancelled">
      <header className="header">
        <button className="back-button" onClick={onGoBack}>
          <ChevronLeft className="icon" />
        </button>
        <h1>Ride Cancelled</h1>
      </header>

      <div className="cancellation-info">
        <div className="cancellation-icon">
          <X className="icon" />
        </div>
        <h2>Your ride has been cancelled</h2>
        <p>We're sorry for the inconvenience</p>
      </div>

      <div className="cancellation-details">
        <div className="detail">
          <AlertCircle className="icon" />
          <p>Cancellation fee of ₹0 has been applied</p>
        </div>
        <div className="detail">
          <AlertCircle className="icon" />
          <p>Free cancellations: 3 remaining today</p>
        </div>
      </div>

      <div className="actions">
        <button className="rebook-button" onClick={handleRebook}>
          <RefreshCw className="icon" />
          Rebook Ride
        </button>
      </div>

      <div className="support-info">
        <p>Need help? Contact our support</p>
        <a href="tel:+919876543210" className="support-phone">+91 98765 43210</a>
      </div>
    </div>
  );
};

export default RideCancelled;