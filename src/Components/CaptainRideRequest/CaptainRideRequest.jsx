import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Clock, CreditCard, User, Check, X } from 'react-feather';
import './CaptainRideRequest.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CaptainRideRequest = ({ rideRequest, onApprove, onDecline }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  // const { customerName, pickup, dropoff, distance, estimatedFare } = rideRequest;
  const rideRequest2 = {
    customerName: "John Doe",
    pickup: "Location A",
    dropoff: "Location B",
    distance: 15.5,
    estimatedFare: 120.00
  };
  const { customerName, pickup, dropoff, distance, estimatedFare } = rideRequest2;
  const center = { lat: 12.9716, lng: 77.5946 }; // Bangalore center

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  return (
    <div className="captain-ride-request">
      <div className="map-container">
        <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[center.lat, center.lng]}>
            <Popup>
              Pickup location
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="ride-details">
        <h1>New Ride Request</h1>

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

        <div className="timer">
          Time left to respond: {timeLeft} seconds
        </div>

        <div className="action-buttons">
          <button className="approve-button" onClick={onApprove}>
            <Check className="icon" />
            Approve
          </button>
          <button className="decline-button" onClick={onDecline}>
            <X className="icon" />
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaptainRideRequest;