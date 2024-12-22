import React, { useState } from 'react';
import './CaptainLogin.css';
import axios from 'axios';
import logo from '../../Assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Show loading state

    const data = JSON.stringify({
      email: email,
      password: password,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/api/captains/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(response)
      if (response.data.result === 'Success') {
        localStorage.setItem('token', response.data.token);
        navigate('/captaindashboard');
      }
      if (response.data.result == 'Error') {
        setError(() => response.data.message);
        return;
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false); // End loading state
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-800">Captain Login</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
              }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Forgot Password Link */}
        {/* <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-sm text-yellow-600 hover:text-yellow-700">
            Forgot your password?
          </a>
        </div> */}

        {/* Sign Up Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">Not a Rapido Captain yet?</p>
          <a href="/CaptainSignup" className="text-yellow-600 hover:text-yellow-700 font-semibold">
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

export default CaptainLogin;