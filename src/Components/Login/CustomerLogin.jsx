import React, { useState } from 'react';
import './CustomerLogin.css';
import logo from '../../Assets/logo.svg';
import customer from '../../Assets/passanger.webp';

const CustomerLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const generateOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    console.log(`OTP sent to ${phoneNumber}: ${newOtp}`);
    setOtpSent(true);
    setError('');
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
      generateOtp();
    } else {
      setError('Please enter a valid 10-digit phone number');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      console.log('Login successful');
      // Proceed with login
      setError('');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Rapido Logo"
            className="mx-auto mb-4"
            style={{ width: '180px', height: '60px' }}
          />
          <h1 className="text-2xl font-bold text-gray-800">Customer Login</h1>
        </div>

        <div className="flex justify-center mb-6">
          <img
            src={customer}
            alt="Customer"
            className="rounded-full customer-icon"
            style={{ width: '80px', height: '80px' }}
          />
        </div>

        <form onSubmit={otpSent ? handleSubmit : handleSendOtp} className="space-y-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              required
              pattern="[0-9]{10}"
              placeholder="Enter 10-digit number"
              disabled={otpSent}
            />
          </div>
          {otpSent && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                required
                pattern="[0-9]{4}"
                placeholder="Enter 4-digit OTP"
              />
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {otpSent ? 'Login' : 'Send OTP'}
          </button>
        </form>

        {otpSent && (
          <div className="mt-4 text-center">
            <button onClick={generateOtp} className="text-sm text-yellow-600 hover:text-yellow-700">
              Resend OTP
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600">New to Rapido?</p>
          <a href="/CustomerSignup" className="text-yellow-600 hover:text-yellow-700 font-semibold">
            Sign up here
          </a>
        </div>
      </div>

      <div className="mt-8 text-black text-center">
        <p className="font-bold text-xl mb-2">India's Largest Bike Taxi Service</p>
        <p className="text-sm">Fast, Safe and Affordable</p>
      </div>
    </div>
  );
}

export default CustomerLogin;