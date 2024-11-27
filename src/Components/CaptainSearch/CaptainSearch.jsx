import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Truck, Star, Phone } from 'react-feather';
import './CaptainSearch.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CaptainSearch = ({ rideType, pickup, dropoff }) => {
  const [isSearching, setIsSearching] = useState(true);
  const [captain, setCaptain] = useState(null);
  const [captainLocation, setCaptainLocation] = useState(null);

  const center = { lat: 12.9716, lng: 77.5946 }; // Bangalore center

  useEffect(() => {
    // Simulating captain search
    const searchTimeout = setTimeout(() => {
      setIsSearching(false);
      setCaptain({
        name: "Rajesh Kumar",
        rating: 4.8,
        totalRides: 1250,
        vehicleNumber: "KA 01 AB 1234",
        phoneNumber: "+91 9876543210"
      });
      setCaptainLocation({
        lat: center.lat + (Math.random() - 0.5) * 0.01,
        lng: center.lng + (Math.random() - 0.5) * 0.01
      });
    }, 3000);

    return () => clearTimeout(searchTimeout);
  }, []);

  return (
    <div className="captain-search">
      <div className="map-container">
        <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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
            <p>Searching for nearby {rideType === 'bike' ? 'bike' : 'auto'} captains...</p>
          </div>
        ) : captain ? (
          <div className="captain-info">
            <div className="captain-header">
              <img src="/captain-avatar.png" alt="Captain" className="captain-avatar" />
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
              {/* {rideType === 'bike' ? <Motorcycle className="icon" /> : <Truck className="icon" />} */}
              <span>{captain.vehicleNumber}</span>
            </div>
            <div className="ride-details">
              <div className="detail">
                <strong>Pickup:</strong> {pickup}
              </div>
              <div className="detail">
                <strong>Drop:</strong> {dropoff}
              </div>
            </div>
            <button className="contact-captain">
              <Phone className="icon" />
              Call Captain
            </button>
            <p className="eta">Your captain is 3 mins away</p>
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

export default CaptainSearch;