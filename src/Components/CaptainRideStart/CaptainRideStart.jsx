import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Phone, MessageCircle, User, Clock, CreditCard, Check } from 'react-feather';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CaptainRideStart = ({ rideDetails, onStartRide }) => {
  rideDetails = {
    customerName: "John Doe",
    customerPhone: "+1 555-123-4567",
    pickup: "123 Main Street, Springfield",
    dropoff: "456 Elm Street, Shelbyville",
    distance: 15.2, // distance in kilometers
    estimatedFare: 25.50 // estimated fare in dollars
  };
  const [showChat, setShowChat] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const { customerName, customerPhone, pickup, dropoff, distance, estimatedFare } = rideDetails;

  // For demonstration, we'll use fixed coordinates. In a real app, these would be dynamic.
  const pickupLocation = [12.9815, 77.6094];

  const handleCall = () => {
    window.location.href = `tel:${customerPhone}`;
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would verify the OTP with your backend here
    if (otp === '1234') { // Example OTP
      onStartRide();
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="captain-ride-start">
      <div className="map-container">
        <MapContainer center={pickupLocation} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={pickupLocation}>
            <Popup>Pickup location</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="ride-details">
        <h1>Start Ride</h1>

        <div className="customer-info">
          <User className="icon" />
          <span>{customerName}</span>
        </div>

        <div className="location-info">
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
            <p>{distance} km</p>
          </div>
          <div className="stat">
            <CreditCard className="icon" />
            <p>₹{estimatedFare}</p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="call-button" onClick={handleCall}>
            <Phone className="icon" />
            Call Customer
          </button>
          <button className="chat-button" onClick={() => setShowChat(!showChat)}>
            <MessageCircle className="icon" />
            Chat with Customer
          </button>
        </div>

        {showChat && (
          <div className="chat-window">
            <h3>Chat with {customerName}</h3>
            <div className="chat-messages">
              {/* Chat messages would go here */}
            </div>
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
          </div>
        )}

        <form onSubmit={handleOtpSubmit} className="otp-form">
          <h3>Enter Customer's OTP to Start Ride</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 4-digit OTP"
            maxLength={4}
            required
          />
          {otpError && <p className="error">{otpError}</p>}
          <button type="submit" className="start-ride-button">
            <Check className="icon" />
            Verify OTP & Start Ride
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaptainRideStart;
