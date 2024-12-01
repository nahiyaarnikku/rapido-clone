import { Bike, Clock, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './cmp.css';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!token) {
      console.log('No token found');
      navigate('/customerlogin');
    }
  }, []);

  const [userData, setUserData] = useState(() => {
    const user = location.state?.userProfile;
    return user || {};
  })

  useEffect(() => {
    // console.log("userData", userData)
  }, [userData])

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/customerlogin');
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <header className="profile-header">
        <div className="back-btn">
          <i className="fas fa-arrow-left"></i> Back
        </div>
        <h1>Customer's Profile</h1>
      </header>

      {/* Profile Body */}
      <section className="profile-body">
        {/* Profile Info */}
        <div className="profile-info">
          <div className="profile-avatar">
            <span>{userData.name[0]}</span>
          </div>
          <div className="profile-details">
            <h2 className="profile-name">{userData.name}</h2>
            <p className="profile-phone">+91 {userData.phone}</p>
            <button className="profile-edit-button">Edit Profile</button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="stat-value">{userData.rideHistory.length}</span>
            <span className="stat-label"> Rides</span>
          </div>
          <div className="profile-stat">
            <span className="stat-value">₹ 8,000</span>
            <span className="stat-label"> Total Spendings</span>
          </div>
          <div className="profile-stat">
            <span className="stat-value">4.8</span>
            <span className="stat-label"> Rating</span>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="recent-rides">
          <div className="recent-ride-item">
            <i className="fas fa-map-marker-alt recent-ride-icon"></i>
            <div className="recent-ride-details">
              <span className="recent-ride-route">Sector 62 to Sector 15</span>
              <span className="recent-ride-date"> Nov 17, 2024</span>
            </div>
            <span className="recent-ride-amount">₹ 450</span>
          </div>
        </div>

        {/* Account Options */}
        {/* <div className="account-options">
          <a href="#" className="account-option-link">
            <i className="fas fa-cogs account-option-icon"></i> Settings
          </a>
          <a href="#" className="account-option-link">
            <i className="fas fa-wallet account-option-icon"></i> Payments
          </a> */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div onClick={() => handleLogOut()} style={{ display: 'flex', flexDirection: 'column', width: '100%', color: '#fbbf24', textDecoration: 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: '24px', fontWeight: '600', marginLeft: 'auto' }}>Log Out</span>
            </div>
          </div>
        {/* </div> */}
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'white', padding: '16px', boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)' }}>
        <nav style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around' }}>
          <div onClick={() => navigate("/customerhome")} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af', textDecoration: 'none', cursor: 'pointer' }}>
            <Bike style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>Home</span>
          </div>
          <div onClick={() => navigate("/my-rides")} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af', textDecoration: 'none', cursor: 'pointer' }}>
            <Clock style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>My Rides</span>
          </div>
          <div onClick={() => navigate("/customerprofile")} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fbbf24', textDecoration: 'none', cursor: 'pointer' }}>
            <User style={{ height: '24px', width: '24px' }} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>Profile</span>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Profile;
