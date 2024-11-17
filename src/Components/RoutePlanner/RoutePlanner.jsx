<<<<<<< HEAD
import React, { useState } from 'react'
import { Bike, Truck, Menu, MapPin, Clock, CreditCard, User } from 'lucide-react'
import logo from '../../Assets/logo.svg';

const RoutePlanner = () => {
  const [destination, setDestination] = useState('')

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  }

  const iconButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '96px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    color: 'black',
    fontSize: '12px',
    cursor: 'pointer',
  }

  const handleDestinationChange = (e) => {
    setDestination(e.target.value)
  }

  const handleRideSelection = (rideType) => {
    console.log(`Selected ride type: ${rideType}`)
    // Here you would typically initiate the booking process
  }

  return (
      <div className="min-h-screen bg-yellow-400 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Rapido Logo"
            className="mx-auto mb-4"
            style={{ width: '100px', height: '60px' }}
          />
        </div>

      <main style={{ flexGrow: 1, maxWidth: '800px', margin: 'auto', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <section style={{ marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <MapPin style={{ height: '20px', width: '20px', color: '#fbbf24', marginRight: '8px' }} />
              <input
                placeholder="Where to?"
                value={destination}
                onChange={handleDestinationChange}
                style={{
                  flexGrow: 1,
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  padding: '8px',
                  fontSize: '16px',
                }}
                aria-label="Enter destination"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <button style={buttonStyle} onClick={() => handleRideSelection('Bike')}>
                <Bike style={{ height: '24px', width: '24px', marginRight: '8px' }} />
                <span>Bike</span>
              </button>
              <button style={buttonStyle} onClick={() => handleRideSelection('Auto')}>
                <Truck style={{ height: '24px', width: '24px', marginRight: '8px' }} />
                <span>Auto</span>
              </button>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Quick Links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <button style={iconButtonStyle} aria-label="Ride Later">
              <Clock style={{ height: '24px', width: '24px', marginBottom: '8px', color: '#fbbf24' }} />
              <span>Ride Later</span>
            </button>
            <button style={iconButtonStyle} aria-label="My Places">
              <MapPin style={{ height: '24px', width: '24px', marginBottom: '8px', color: '#fbbf24' }} />
              <span>My Places</span>
            </button>
            <button style={iconButtonStyle} aria-label="Payments">
              <CreditCard style={{ height: '24px', width: '24px', marginBottom: '8px', color: '#fbbf24' }} />
              <span>Payments</span>
            </button>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Offers for you</h2>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '16px', display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fbbf24', borderRadius: '50%', padding: '8px', marginRight: '16px' }}>
              <CreditCard style={{ height: '24px', width: '24px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ fontWeight: '600' }}>50% off on first 5 rides</h3>
              <p style={{ fontSize: '14px', color: '#4b5563' }}>Use code: NEWUSER</p>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', padding: '16px', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ backgroundColor: '#fbbf24', borderRadius: '50%', padding: '8px', marginRight: '16px' }}>
              <CreditCard style={{ height: '24px', width: '24px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ fontWeight: '600' }}>30% off: festive offer</h3>
              <p style={{ fontSize: '14px', color: '#4b5563' }}>Use code: FESTIVE30</p>
            </div>
          </div>
        </section>

      </main>

      <footer style={{ backgroundColor: 'white', padding: '16px', boxShadow: '0 -1px 3px 0 rgba(0, 0, 0, 0.1)', height: "full", position: 'fixed', bottom: '0', width: '100%' }}>
        <nav style={{ maxWidth: '900px', height: '48px', margin: '0 auto', display: 'flex', justifyContent: 'space-around' }}>
          <a href="/home" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fbbf24', textDecoration: 'none' }}>
            <Bike style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>Home</span>
          </a>
          <a href="/my-rides" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af', textDecoration: 'none' }}>
            <Clock style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>My Rides</span>
          </a>
          <a href="/profile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af', textDecoration: 'none' }}>
            <User style={{ height: '24px', width: '24px' }} />
        
            <span style={{ fontSize: '12px', marginTop: '4px' }}>Profile</span>
          </a>
        </nav>
      </footer>
    </div>
    </div>
=======
import React from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 28.7041, lng: 77.1025 }

function RoutePlanner() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  console.log("API KEY", process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }
  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
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
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
    </Flex>
>>>>>>> 35d76777ffbf3f05e49852754aa7aae08569314a
  )
}

export default RoutePlanner