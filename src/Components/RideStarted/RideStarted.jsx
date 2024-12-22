import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Truck, Star, Phone, X } from 'react-feather';
import './RideStarted.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../App';
import axios from 'axios';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RideStarted = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [captain, setCaptain] = useState(null);
  const [captainLocation, setCaptainLocation] = useState(null);
  const [error, setError] = useState(null);
  const [pickup, setPickup] = useState({});
  const [dropoff, setDropoff] = useState({});
  const [rideType, setRideType] = useState('');
  const location = useLocation();
  const isFromCaptain = location.pathname === '/ride-started-captain';
  const naviagte = useNavigate();


  const center = { lat: 28.679079, lng: 77.069710 }; // delhi center

  const handleCancel = ()=>{
    naviagte('/ride-cancelled');
  }

  const handleEnd = () => {
    naviagte('/customer-ride-end');
  }

  useEffect(() => {
    const bookedRideDetails = JSON.parse(localStorage.getItem('bookedRideDetails'));
    console.log(bookedRideDetails);
    const data = {
      name: bookedRideDetails.captainName,
      rating: bookedRideDetails.captainRating,
      totalRides: bookedRideDetails.totalRides,
      vehicleNumber: bookedRideDetails.captainVehicleNumber,
      phone: bookedRideDetails.captainPhone,
      origin: bookedRideDetails.origin,
      destination: bookedRideDetails.destination,
      center: bookedRideDetails.center,
      pickup: bookedRideDetails.pickup,
      dropoff: bookedRideDetails.dropoff
    }
    setCaptain(data);
    setPickup(data.pickup);
    setDropoff(data.dropoff);
  }, []);

  const updateRideStatus = (status) => {

  }

  return (
    <div className="captain-search">
      <div className="map-container">
        <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Pickup Marker */}
          {pickup.lat && (
            <Marker position={[+pickup.lat, +pickup.lng]}>
              <Popup>
                Pickup Location
              </Popup>
            </Marker>
          )}


          {/* Dropoff Marker */}
          {dropoff.lat && (
            <Marker position={[+dropoff.lat, +dropoff.lng]}>
              <Popup>
                Dropoff Location
              </Popup>
            </Marker>
          )}

          {/* Captain's Location Marker */}
          {captainLocation && (
            <Marker position={[captainLocation.lat, captainLocation.lng]}>
              <Popup>
                Captain's Location
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="search-panel">
        {isSearching ? (
          <div className="searching">
            <div className="loader"></div>
            <p>Searching for ride details...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : captain ? (
          <div className="captain-info">
            <div className="captain-header">
              <img src='/captain.svg' alt="captain-img" className="captain-avatar" />
              <div>
                <h2>{captain.name}</h2>
                <div className="rating">
                  <Star className="icon star" />
                  <span>{captain.rating}</span>
                  <span className="total-rides">({captain.totalRides} rides)</span>
                </div>
              </div>
            </div>
            <div className="vehicle-info">
              <span>{captain.vehicleNumber}</span>
            </div>
            <div className="ride-details">
              <div className="detail">
                <strong>Pickup:</strong> {pickup ? `${captain.origin}` : 'N/A'}
              </div>
              <div className="detail">
                <strong>Drop:</strong> {dropoff ? `${captain.destination}` : 'N/A'}
              </div>
            </div>
            <button className="contact-captain">
              Ride Started
            </button>
            {isFromCaptain && (
              <div>
              <button className="decline-button" onClick={() => naviagte('/customer-ride-ended')}>
                <X className="icon" />
                End Ride
              </button>
              <button className="decline-button" onClick={handleCancel}>
              <X className="icon" />
              Cancel Ride
            </button>
              </div>

            )}
          </div>
        ) : (
          <div className="no-captain">
            <p>Sorry, no captains available at the moment. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideStarted;
