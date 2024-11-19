import React from 'react';
import './cmp.css';
import { Bike, Clock, User } from 'lucide-react'
import CustomerLogin from '../Login/CustomerLogin';


const Profile = () => {
  return (
    <div className="profile-container">
      {/* Profile Header */}
      <header className="profile-header">
        <div className="back-btn">
          <i className="fas fa-arrow-left"></i> Back
        </div>
        <h1>Tanvi Dubey's Profile</h1>
      </header>

      {/* Profile Body */}
      <section className="profile-body">
        {/* Profile Info */}
        <div className="profile-info">
          <div className="profile-avatar">
            <span>T</span>
          </div>
          <div className="profile-details">
            <h2 className="profile-name">Tanvi Dubey</h2>
            <p className="profile-phone">+91 123 456 7890</p>
            <button className="profile-edit-button">Edit Profile</button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="stat-value">52</span>
            <span className="stat-label">Rides</span>
          </div>
          <div className="profile-stat">
            <span className="stat-value">₹ 8,000</span>
            <span className="stat-label">Total Earnings</span>
          </div>
          <div className="profile-stat">
            <span className="stat-value">4.8</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="recent-rides">
          <div className="recent-ride-item">
            <i className="fas fa-map-marker-alt recent-ride-icon"></i>
            <div className="recent-ride-details">
              <span className="recent-ride-route">Sector 62 to Sector 15</span>
              <span className="recent-ride-date">Nov 17, 2024</span>
            </div>
            <span className="recent-ride-amount">₹ 450</span>
          </div>
        </div>

        {/* Account Options */}
        <div className="account-options">
          <a href="#" className="account-option-link">
            <i className="fas fa-cogs account-option-icon"></i> Settings
          </a>
          <a href="#" className="account-option-link">
            <i className="fas fa-wallet account-option-icon"></i> Payments
          </a>
          <button className="logout-button">Logout</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'white', padding: '16px', boxShadow: '0 -1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <nav style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around' }}>
          <a href="/customerhome" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af', textDecoration: 'none' }}>
            <Bike style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>Home</span>
          </a>
          <a href="/my-rides" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af', textDecoration: 'none' }}>
            <Clock style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>My Rides</span>
          </a>
          <a href="/customerprofile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fbbf24', textDecoration: 'none' }}>
            <User style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>Profile</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default Profile;
