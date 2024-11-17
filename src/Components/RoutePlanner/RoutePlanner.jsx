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
  )
}

export default RoutePlanner