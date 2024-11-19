import React from 'react'
import { Bike, Menu, MapPin, Clock, CreditCard, User } from 'lucide-react'
import './cmh.css'

export default function HomePage() {
  const iconButtonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '96px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: 'black',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#fbbf24', color: 'black', padding: '16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Menu style={{ height: '24px', width: '24px', color: 'black' }} />
          <h1 style={{ fontSize: '28px', fontWeight: '700' }}>Rapido</h1>
          <div style={{ width: '24px' }}></div>
        </div>
      </header>

      <main style={{ flexGrow: 1, maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
        <section style={{ marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <MapPin style={{ height: '20px', width: '20px', color: '#fbbf24', marginRight: '8px' }} />
              <input
                placeholder="Where to?"
                style={{
                  flexGrow: 1,
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '16px',
                  color: '#333',
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <a href='/route-planner' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fbbf24', textDecoration: 'none' }}>
              <span style={{ fontSize: '24px', fontWeight: '600', alignSelf: 'center', marginLeft: '8px' }}>Book Ride</span>
              </a>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '16px' }}>Quick Links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <button style={iconButtonStyle} onMouseOver={() => { iconButtonStyle.transform = 'scale(1.05)'; iconButtonStyle.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'; }} onMouseOut={() => { iconButtonStyle.transform = 'scale(1)'; iconButtonStyle.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; }}>
              <Clock style={{ height: '24px', width: '24px', marginBottom: '8px', color: '#fbbf24' }} />
              <span>Ride Later</span>
            </button>
            <button style={iconButtonStyle} onMouseOver={() => { iconButtonStyle.transform = 'scale(1.05)'; iconButtonStyle.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'; }} onMouseOut={() => { iconButtonStyle.transform = 'scale(1)'; iconButtonStyle.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; }}>
              <MapPin style={{ height: '24px', width: '24px', marginBottom: '8px', color: '#fbbf24' }} />
              <span>My Places</span>
            </button>
            <button style={iconButtonStyle} onMouseOver={() => { iconButtonStyle.transform = 'scale(1.05)'; iconButtonStyle.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'; }} onMouseOut={() => { iconButtonStyle.transform = 'scale(1)'; iconButtonStyle.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; }}>
              <CreditCard style={{ height: '24px', width: '24px', marginBottom: '8px', color: '#fbbf24' }} />
              <span>Payments</span>
            </button>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '16px' }}>Offers for you</h2>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '16px', display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fbbf24', borderRadius: '50%', padding: '12px', marginRight: '20px' }}>
              <CreditCard style={{ height: '24px', width: '24px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ fontWeight: '600', fontSize: '18px' }}>50% off on first 5 rides</h3>
              <p style={{ fontSize: '14px', color: '#4b5563' }}>Use code: NEWUSER</p>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ backgroundColor: 'white', padding: '16px', boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)' }}>
        <nav style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around' }}>
          <a href="/customerhome" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fbbf24', textDecoration: 'none' }}>
            <Bike style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>Home</span>
          </a>
          <a href="/my-rides" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af', textDecoration: 'none' }}>
            <Clock style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>My Rides</span>
          </a>
          <a href="/customerprofile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af', textDecoration: 'none' }}>
            <User style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>Profile</span>
          </a>
        </nav>
      </footer>
    </div>
  )
}
