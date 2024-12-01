import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Clock, CreditCard, User, Check, X } from 'react-feather';
import './CaptainRideRequest.css';
import { useLocation } from 'react-router-dom';
import { BaseUrl } from '../../App';
import axios from 'axios';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CaptainRideRequest = () => {
  const { state } = useLocation();
  const [timeLeft, setTimeLeft] = useState(30);
  const [rideRequested, setRideRequested] = useState({})
  // const { customerName, pickup, dropoff, distance, estimatedFare } = rideRequest2;
  const center = { lat: 12.9716, lng: 77.5946 }; // Bangalore center

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (state.id) {
      const loginCustomer = JSON.parse(localStorage.getItem('loginCustomer'));
      const data = {};
      data.customerName = loginCustomer.message.name
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: BaseUrl + '/api/rides/' + state.id,
        headers: {}
      };

      axios.request(config)
        .then((response) => {
          data.pickup = response.data.startLocation;
          data.dropoff = response.data.endLocation;
          data.distance = response.data.distance;
          data.estimatedFare = response.data.price;
          setRideRequested(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [state])

  const updateRideStatus = (status) => {}

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
          <span>{rideRequested.customerName}</span>
        </div>

        <div className="location-info">
          <div className="location">
            <MapPin className="icon" />
            <div>
              <p className="label">Pickup</p>
              <p>{rideRequested.pickup}</p>
            </div>
          </div>
          <div className="location">
            <MapPin className="icon" />
            <div>
              <p className="label">Drop-off</p>
              <p>{rideRequested.dropoff}</p>
            </div>
          </div>
        </div>

        <div className="ride-stats">
          <div className="stat">
            <Clock className="icon" />
            <p>{rideRequested.distance}</p>
          </div>
          <div className="stat">
            <CreditCard className="icon" />
            <p>₹{rideRequested.estimatedFare}</p>
          </div>
        </div>

        <div className="timer">
          Time left to respond: {timeLeft} seconds
        </div>

        <div className="action-buttons">
          <button className="approve-button" onClick={updateRideStatus}>
            <Check className="icon" />
            Approve
          </button>
          <button className="decline-button" onClick={updateRideStatus}>
            <X className="icon" />
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaptainRideRequest;