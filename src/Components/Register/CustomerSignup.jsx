import React, { useState } from 'react';
import './CustomerSignup.css';
import logo from '../../Assets/logo.svg';
import customer from '../../Assets/passanger.webp';

const CustomerSignup = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    return /^[A-Za-z\s]{2,50}$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const validateOtp = (otp) => {
    return /^[0-9]{6}$/.test(otp);
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
    setFullName(value);
    if (!validateName(value)) {
      setErrors(prev => ({ ...prev, fullName: 'Please enter a valid name (2-50 characters, letters only)' }));
    } else {
      setErrors(prev => ({ ...prev, fullName: null }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setErrors(prev => ({ ...prev, email: null }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhoneNumber(value);
    if (!validatePhoneNumber(value)) {
      setErrors(prev => ({ ...prev, phoneNumber: 'Please enter a valid 10-digit phone number' }));
    } else {
      setErrors(prev => ({ ...prev, phoneNumber: null }));
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setOtp(value);
    if (!validateOtp(value)) {
      setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
    } else {
      setErrors(prev => ({ ...prev, otp: null }));
    }
  };

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    console.log(`OTP sent to ${phoneNumber}: ${newOtp}`);
    setOtpSent(true);
    setErrors({});
  };

  const handleGetOtp = (e) => {
    e.preventDefault();
    if (validatePhoneNumber(phoneNumber)) {
      generateOtp();
    } else {
      setErrors(prev => ({ ...prev, phoneNumber: 'Please enter a valid 10-digit phone number' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    if (!validateName(fullName)) formErrors.fullName = 'Please enter a valid name';
    if (!validateEmail(email)) formErrors.email = 'Please enter a valid email';
    if (!validatePhoneNumber(phoneNumber)) formErrors.phoneNumber = 'Please enter a valid phone number';
    if (!validateOtp(otp)) formErrors.otp = 'Please enter a valid OTP';

    if (Object.keys(formErrors).length === 0) {
      if (otp === generatedOtp) {
        console.log('Signup successful', { fullName, email, phoneNumber });
        // Proceed with signup
        onClose();
      } else {
        setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
      }
    } else {
      setErrors(formErrors);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Rapido Logo"
            className="mx-auto mb-4"
            style={{ width: '180px', height: '60px' }}
          />
          <h1 className="text-2xl font-bold text-gray-800">Sign Up as a Customer</h1>
        </div>
        
        <div className="flex justify-center mb-6">
          <img
            src={customer}
            alt="Customer"
            className="rounded-full customer-icon"
            style={{ width: '80px', height: '80px' }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={handleNameChange}
              className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
              required
              placeholder="John Doe"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
              required
              placeholder="johndoe@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
              required
              placeholder="Enter 10-digit number"
            />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
          </div>

          {!otpSent ? (
            <button
              type="button"
              onClick={handleGetOtp}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Get OTP
            </button>
          ) : (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.otp ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                required
                placeholder="Enter 6-digit OTP"
              />
              {errors.otp && <p className="mt-1 text-sm text-red-500">{errors.otp}</p>}
              <button
                type="submit"
                className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="font-medium text-yellow-600 hover:text-yellow-500">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;