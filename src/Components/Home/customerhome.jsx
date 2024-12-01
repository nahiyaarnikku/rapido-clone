import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../../App';
import { Bike, Clock, CreditCard, MapPin, Menu, User, Search } from 'lucide-react';
import './cmh.css';

export default function CustomerHome() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  const getUserProfileDetails = async (token) => {
    try {
      const response = await axios.get(BaseUrl + '/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      navigate('/customerlogin');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      navigate('/customerlogin');
    }
    getUserProfileDetails(token);
  }, []);

  return (
    <div className="home-page">
      <header className="header">
        <div className="container">
          <Menu className="menu-icon" />
          <h1 className="logo">Rapido</h1>
          <div className="placeholder"></div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <section className="search-section">
            <div className="search-card">
              <div className="search-input-wrapper">
                <MapPin className="search-icon" />
                <input type="text" placeholder="Where to?" className="search-input" />
              </div>
              <button className="book-ride-btn" onClick={() => navigate('/route-planner')}>
                <Search className="search-icon" />
                Book Ride
              </button>
            </div>
          </section>

          <section className="quick-links-section">
            <h2 className="section-title">Quick Links</h2>
            <div className="quick-links-grid">
              {[
                { icon: MapPin, label: 'My Places' },
                { icon: CreditCard, label: 'Payments' },
                { icon: Clock, label: 'Ride History' },
              ].map((item, index) => (
                <button key={index} className="quick-link-btn">
                  <item.icon className="quick-link-icon" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="offers-section">
            <h2 className="section-title">Offers for you</h2>
            <div className="offer-card">
              <div className="offer-icon-wrapper">
                <CreditCard className="offer-icon" />
              </div>
              <div className="offer-details">
                <h3 className="offer-title">50% off on first 5 rides</h3>
                <p className="offer-code">Use code: NEWUSER</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <nav className="footer-nav">
          {[
            { icon: Bike, label: 'Home', path: '/customerhome', isActive: true },
            { icon: Clock, label: 'My Rides', path: '/my-rides' },
            { icon: User, label: 'Profile', path: '/customerprofile' },
          ].map((item, index) => (
            <div
              key={index}
              className={`footer-nav-item ${item.isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path, item.path === '/customerprofile' ? { state: { userProfile } } : {})}
            >
              <item.icon className="footer-nav-icon" />
              <span className="footer-nav-label">{item.label}</span>
            </div>
          ))}
        </nav>
      </footer>
    </div>
  );
}
