import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Motorcycle, Truck, Star, Phone, MapPin } from 'react-feather';
import './RideBooked.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RideBooked = ({ rideType, captain, pickup, dropoff, price, eta }) => {
  const center = { lat: 12.9716, lng: 77.5946 }; // Bangalore center

  return (
    <div className="ride-booked">
      <div className="map-container">
        <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[center.lat, center.lng]}>
            <Popup>
              Your pickup location
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="booking-details">
        <div className="booking-header">
          <h2>Ride Booked!</h2>
          <p className="eta">Your ride will arrive in {eta} mins</p>
        </div>
        <div className="captain-info">
          <img src="/captain-avatar.png" alt="Captain" className="captain-avatar" />
          <div>
            <h3>{captain.name}</h3>
            <div className="rating">
              <Star className="icon star" />
              <span>{captain.rating}</span>
              <span className="total-rides">({captain.totalRides} rides)</span>
            </div>
          </div>
        </div>
        <div className="vehicle-info">
          {rideType === 'bike' ? <Motorcycle className="icon" /> : <Truck className="icon" />}
          <span>{captain.vehicleNumber}</span>
        </div>
        <div className="ride-details">
          <div className="detail">
            <MapPin className="icon" />
            <div>
              <strong>Pickup:</strong>
              <p>{pickup}</p>
            </div>
          </div>
          <div className="detail">
            <MapPin className="icon" />
            <div>
              <strong>Drop:</strong>
              <p>{dropoff}</p>
            </div>
          </div>
        </div>
        <div className="price-info">
          <strong>Total Fare:</strong>
          <span className="price">₹{price}</span>
        </div>
        <button className="contact-captain">
          <Phone className="icon" />
          Call Captain
        </button>
        <div className="safety-tip">
          <p>Safety Tip: Verify captain and vehicle details before starting your ride.</p>
        </div>
      </div>
    </div>
  );
};

export default RideBooked;