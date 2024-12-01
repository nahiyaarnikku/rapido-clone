import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Phone, MessageCircle, User, Clock, CreditCard, Check } from 'react-feather';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../../App';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CaptainRideStart = () => {
  const { state } = useLocation();
  const [showChat, setShowChat] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [rideRequested, setRideRequested] = useState({})

  // For demonstration, we'll use fixed coordinates. In a real app, these would be dynamic.
  const pickupLocation = [12.9815, 77.6094];

  // const handleCall = () => {
  //   window.location.href = `tel:${customerPhone}`;
  // };

  const onStartRide = () => {
    let data = JSON.stringify({
      "status": "started",
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: BaseUrl + '/api/rides/update/' + state.id,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would verify the OTP with your backend here
    if (otp === '1234') { // Example OTP
      onStartRide();
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  useEffect(() => {
    if (state.id) {
      const loginCustomer = JSON.parse(localStorage.getItem('loginCustomer'));
      const data = {};
      data.customerName = loginCustomer.message.name
      data.customerPhone = loginCustomer.message.phone
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

        <div className="action-buttons">
          <button className="call-button">
            <Phone className="icon" />
            {rideRequested.customerPhone}
          </button>
          <button className="chat-button" onClick={() => setShowChat(!showChat)}>
            <MessageCircle className="icon" />
            Chat with Customer
          </button>
        </div>

        {showChat && (
          <div className="chat-window">
            <h3>Chat with {rideRequested.customerName}</h3>
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
