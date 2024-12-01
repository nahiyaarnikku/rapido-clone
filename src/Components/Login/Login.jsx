import React from 'react';
import './Login.css';
import logo from '../../Assets/logo.svg';
import captain from '../../Assets/captain.jpg';
import passenger from '../../Assets/passanger.webp';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col justify-center items-center p-4">
      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        {/* Rapido Logo and Header */}
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Rapido Logo"
            className="mx-auto mb-4"
            style={{ width: '180px', height: '60px' }}
          />
          <h1 className="text-2xl font-bold text-gray-800">First tell us, who are you?</h1>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4">
          {/* Captain Login Button */}
          <button
            onClick={() => navigate('/CaptainLogin')} // Use navigate onClick
            className="w-full bg-white hover:bg-white text-black font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            <div className="flex items-center">
              <img
                src={captain}
                alt="Captain"
                className="mr-2 rounded-full"
                style={{ width: '40px', height: '40px' }}
              />
              <span>Captain Login</span>
            </div>
          </button>

          {/* Customer Login Button */}
          <button
            onClick={() => navigate('/customerlogin')} // Use navigate onClick
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            <div className="flex items-center">
              <img
                src={passenger}
                alt="Customer"
                className="mr-2 rounded-full"
                style={{ width: '40px', height: '40px' }}
              />
              <span>Customer Login</span>
            </div>
          </button>
        </div>

        {/* Sign Up Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">New to Rapido?</p>
          <a href="/register" className="text-yellow-600 hover:text-yellow-700 font-semibold">
            Sign up here
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-black text-center">
        <p className="font-bold text-xl mb-2">India's Largest Bike Taxi Service</p>
        <p className="text-sm">Fast, Safe and Affordable</p>
      </div>
    </div>
  );
};

export default Login;
