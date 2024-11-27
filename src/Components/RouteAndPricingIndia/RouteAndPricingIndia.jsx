import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { Truck, Clock, MapPin, CreditCard } from 'react-feather';
import './RouteAndPricingIndia.css';

const RouteAndPricingIndia = ({ pickup, dropoff }) => {
  const [directions, setDirections] = useState(null);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [bikePricing, setBikePricing] = useState(null);
  const [autoPricing, setAutoPricing] = useState(null);
  const [nearbyVehicles, setNearbyVehicles] = useState({ bikes: [], autos: [] });
  const [selectedRide, setSelectedRide] = useState(null);

  const center = { lat: 12.9716, lng: 77.5946 }; // Bangalore center
  const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

  useEffect(() => {
    // Simulating fetching nearby vehicles
    const fetchNearbyVehicles = () => {
      const bikes = Array(5).fill().map((_, i) => ({
        id: `bike-${i}`,
        position: {
          lat: center.lat + (Math.random() - 0.5) * 0.01,
          lng: center.lng + (Math.random() - 0.5) * 0.01
        }
      }));
      const autos = Array(3).fill().map((_, i) => ({
        id: `auto-${i}`,
        position: {
          lat: center.lat + (Math.random() - 0.5) * 0.01,
          lng: center.lng + (Math.random() - 0.5) * 0.01
        }
      }));
      setNearbyVehicles({ bikes, autos });
    };

    fetchNearbyVehicles();
    const interval = setInterval(fetchNearbyVehicles, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const directionsCallback = (response) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
      setDuration(response.routes[0].legs[0].duration.text);
      setDistance(response.routes[0].legs[0].distance.text);
      
      // Calculate dynamic pricing
      const distanceInKm = response.routes[0].legs[0].distance.value / 1000;
      const baseBikePrice = 15; // in INR
      const baseAutoPrice = 25; // in INR
      const bikePerKmRate = 4;
      const autoPerKmRate = 7;
      
      const calculatedBikePrice = Math.round(baseBikePrice + (distanceInKm * bikePerKmRate));
      const calculatedAutoPrice = Math.round(baseAutoPrice + (distanceInKm * autoPerKmRate));
      
      setBikePricing(calculatedBikePrice);
      setAutoPricing(calculatedAutoPrice);
    }
  };

  const handleRideSelection = (rideType) => {
    setSelectedRide(rideType);
  };

  return (
    <div className="route-and-pricing-india">
      <div className="map-container">
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerClassName="google-map"
            center={center}
            zoom={13}
          >
            {pickup && dropoff && (
              <DirectionsService
                options={{
                  destination: dropoff,
                  origin: pickup,
                  travelMode: 'DRIVING'
                }}
                callback={directionsCallback}
              />
            )}
            {directions && (
              <DirectionsRenderer
                options={{
                  directions: directions
                }}
              />
            )}
            {nearbyVehicles.bikes.map((bike) => (
              <Marker
                key={bike.id}
                position={bike.position}
                icon={{
                  url: '/bike-icon.png',
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
              />
            ))}
            {nearbyVehicles.autos.map((auto) => (
              <Marker
                key={auto.id}
                position={auto.position}
                icon={{
                  url: '/auto-icon.png',
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="pricing-panel">
        <div className="location-info">
          <div className="pickup">
            <MapPin className="icon" />
            <p>{pickup}</p>
          </div>
          <div className="dropoff">
            <MapPin className="icon" />
            <p>{dropoff}</p>
          </div>
        </div>
        <h2>Choose your ride</h2>
        <div className={`ride-option ${selectedRide === 'bike' ? 'selected' : ''}`} onClick={() => handleRideSelection('bike')}>
          {/* <Motorcycle className="icon" /> */}
          <div className="ride-details">
            <h3>Bike</h3>
            <p>₹{bikePricing || '--'}</p>
          </div>
          <div className="ride-time">
            <Clock className="icon" />
            <p>{duration || '--'}</p>
          </div>
        </div>
        <div className={`ride-option ${selectedRide === 'auto' ? 'selected' : ''}`} onClick={() => handleRideSelection('auto')}>
          <Truck className="icon" />
          <div className="ride-details">
            <h3>Auto</h3>
            <p>₹{autoPricing || '--'}</p>
          </div>
          <div className="ride-time">
            <Clock className="icon" />
            <p>{duration || '--'}</p>
          </div>
        </div>
        <p className="distance">Total Distance: {distance || '--'}</p>
        <div className="payment-options">
          <h3>Payment Method</h3>
          <div className="payment-method">
            <CreditCard className="icon" />
            <span>Cash</span>
          </div>
        </div>
        <button className="book-ride" disabled={!selectedRide}>Book Now</button>
      </div>
    </div>
  );
};

export default RouteAndPricingIndia;