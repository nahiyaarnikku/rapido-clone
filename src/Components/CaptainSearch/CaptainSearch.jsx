import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Truck, Star, Phone } from 'react-feather';
import './CaptainSearch.css';
import { useLocation } from 'react-router-dom';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CaptainSearch = () => {
  const { state } = useLocation(); // Access the state passed from navigate()
  const [isSearching, setIsSearching] = useState(true);
  const [captain, setCaptain] = useState(null);
  const [captainLocation, setCaptainLocation] = useState(null);
  const [error, setError] = useState(null);
  const [pickup, setPickup] = useState({});
  const [dropoff, setDropoff] = useState({});
  const [rideType, setRideType] = useState('');

  const center = { lat: 28.679079, lng: 77.069710 }; // Bangalore center

  useEffect(() => {
    // Parse the pickup and dropoff locations from JSON
    setRideType(state.rideType);
    setPickup(JSON.parse(state.pickup));
    setDropoff(JSON.parse(state.dropoff));
    // Simulate the fetch for now
    setCaptain({
      name: "Mukund Kumar",
      rating: 4,
      totalRides: 5,
      vehicleNumber: "test123",
      phoneNumber: 8076872127,
      lat: 28.6965029,
      lng: 77.0647717,
    });
    console.log(pickup, dropoff)
    setIsSearching(false);
  }, [state]);

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
            <p>Searching for nearby {rideType === 'bike' ? 'bike' : 'auto'} captains...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
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
              <span>{captain.vehicleNumber}</span>
            </div>
            <div className="ride-details">
              <div className="detail">
                <strong>Pickup:</strong> {pickup ? `${pickup.lat}, ${pickup.lng}` : 'N/A'}
              </div>
              <div className="detail">
                <strong>Drop:</strong> {dropoff ? `${dropoff.lat}, ${dropoff.lng}` : 'N/A'}
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
