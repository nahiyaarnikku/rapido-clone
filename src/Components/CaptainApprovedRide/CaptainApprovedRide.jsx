import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Phone, MessageCircle, User, Clock, CreditCard } from 'react-feather';
import './CaptainApprovedRide.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CaptainApprovedRide = ({ rideDetails, onStartRide }) => {
  rideDetails = {
    customerName: "John Doe",
    customerPhone: "+1 555-123-4567",
    pickup: "123 Main Street, Springfield",
    dropoff: "456 Elm Street, Shelbyville",
    distance: 15.2, // distance in kilometers
    estimatedFare: 25.50 // estimated fare in dollars
  };
  const [showChat, setShowChat] = useState(false);
  const { customerName, customerPhone, pickup, dropoff, distance, estimatedFare } = rideDetails;

  // For demonstration, we'll use fixed coordinates. In a real app, these would be dynamic.
  const captainLocation = [12.9716, 77.5946];
  const pickupLocation = [12.9815, 77.6094];

  const handleCall = () => {
    window.location.href = `tel:${customerPhone}`;
  };

  return (
    <div className="captain-approved-ride">
      <div className="map-container">
        <MapContainer center={captainLocation} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={captainLocation}>
            <Popup>Your location</Popup>
          </Marker>
          <Marker position={pickupLocation}>
            <Popup>Pickup location</Popup>
          </Marker>
          <Polyline positions={[captainLocation, pickupLocation]} color="blue" />
        </MapContainer>
      </div>
      <div className="ride-details">
        <h1>Ride Approved</h1>

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

        <button className="start-ride-button" onClick={onStartRide}>
          Start Ride
        </button>
      </div>
    </div>
  );
};

export default CaptainApprovedRide;