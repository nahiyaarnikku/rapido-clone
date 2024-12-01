import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Input,
  Text
} from '@chakra-ui/react';
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateFare } from '../../Utils/helper.js';

const center = { lat: 28.7041, lng: 77.1025 };

function RoutePlanner() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [bikefare, setBikefare] = useState('');
  const [autofare, setAutofare] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('bike'); // Default to bike
  const [pickup, setPickup] = useState({});
  const [dropoff, setDropoff] = useState({});

  const originRef = useRef();
  const destiantionRef = useRef();
  const navigate = useNavigate();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    const route = results.routes[0].legs[0];
    setDirectionsResponse(results);
    let startLocation = JSON.stringify(route.start_location);
    let endLocation = JSON.stringify(route.end_location);
    setPickup(startLocation);
    setDropoff(endLocation);

    const distanceValue = parseFloat(route.distance.text.replace(' km', ''));
    const durationValue = parseFloat(route.duration.text.replace(' mins', ''));

    setDistance(route.distance.text);
    setDuration(route.duration.text);

    setBikefare(calculateFare(distanceValue, 'bike', durationValue));
    setAutofare(calculateFare(distanceValue, 'auto', durationValue));
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destiantionRef.current.value = '';
  }

  const handleBooking = () => {
    let ridefare = null;
    if (selectedVehicle === 'bike') ridefare = bikefare;
    if (selectedVehicle === 'auto') ridefare = autofare;
    navigate('/captain-search', {
      state: { rideType: selectedVehicle, ridefare, distance, duration, pickup, dropoff, origin: originRef.current.value, destination: destiantionRef.current.value },
    });
  };

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Destination" ref={destiantionRef} />
            </Autocomplete>
          </Box>
          <ButtonGroup>
            <Button
              backgroundColor="#Fbbf24"
              onClick={calculateRoute}
            >
              Calculate Route
            </Button>
          </ButtonGroup>
        </HStack>
        <Text>Distance: {distance}</Text>
        <Text>Duration: {duration}</Text>
        <div style={{ marginTop: '10px' }}>
          <label>
            <input
              type="radio"
              name="vehicle"
              value="bike"
              checked={selectedVehicle === 'bike'}
              onChange={() => setSelectedVehicle('bike')}
            />
            Bike
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              name="vehicle"
              value="auto"
              checked={selectedVehicle === 'auto'}
              onChange={() => setSelectedVehicle('auto')}
            />
            Auto
          </label>
        </div>
        <Text mt={2}>
          {selectedVehicle === 'bike'
            ? `Bike Fare: ₹${bikefare}`
            : `Auto Fare: ₹${autofare}`}
        </Text>
        <Button
          backgroundColor="#Fbbf24"
          mt={4}
          onClick={() => handleBooking()}
        >
          Book {selectedVehicle === 'bike' ? 'Bike' : 'Auto'}
        </Button>
      </Box>
    </Flex>
  );
}

export default RoutePlanner;
