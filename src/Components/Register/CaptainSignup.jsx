import React, { useState } from 'react';
import './CaptainSignup.css';
import logo from '../../Assets/logo.jpeg';

const CaptainSignup = () => {
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState('');
    const [source, setSource] = useState('');
    const [hasLicense, setHasLicense] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'];
    const sources = ['Friend', 'Social Media', 'Advertisement', 'Other'];

    // Validation function for the entire form
    const validateForm = () => {
        const errors = {};

        if (!fullName) {
            errors.fullName = 'Full name is required.';
        } else if (fullName.length < 3) {
            errors.fullName = 'Full name must be at least 3 characters long.';
        }

        if (!city) {
            errors.city = 'Please select a city.';
        }

        if (!source) {
            errors.source = 'Please select how you found us.';
        }

        if (hasLicense === null) {
            errors.hasLicense = 'Please indicate whether you have a valid driving license.';
        }

        if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
            errors.phoneNumber = 'Please enter a valid 10-digit phone number.';
        }

        if (otpSent && (!otp || otp !== generatedOtp)) {
            errors.otp = 'Please enter a valid 6-digit OTP.';
        }

        return errors;
    };

    // Name change handler with character validation
    const handleNameChange = (e) => {
        const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
        setFullName(value);
    };

    // OTP generation logic
    const generateOtp = () => {
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(newOtp);
        console.log(`OTP sent to ${phoneNumber}: ${newOtp}`);
        setOtpSent(true);
        setError('');
    };

    // OTP button handler
    const handleGetOtp = (e) => {
        e.preventDefault();

        // Validate the phone number first
        if (!/^\d{10}$/.test(phoneNumber)) {
            setValidationErrors({ phoneNumber: 'Please enter a valid 10-digit phone number.' });
        } else {
            setValidationErrors({});
            generateOtp();
        }
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
        } else {
            setValidationErrors({});
            console.log('Signup successful', { fullName, city, source, hasLicense, phoneNumber });
            // Proceed with signup logic here
            setError('');
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
                    <h1 className="text-2xl font-bold text-gray-800">Become a Captain</h1>
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
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                            placeholder="Enter your name"
                        />
                        {validationErrors.fullName && <p className="text-red-500 text-sm mt-1">{validationErrors.fullName}</p>}
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Select Your City
                        </label>
                        <select
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        >
                            <option value="">Select a city</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        {validationErrors.city && <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>}
                    </div>

                    <div>
                        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                            How did you find us?
                        </label>
                        <select
                            id="source"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        >
                            <option value="">Select an option</option>
                            {sources.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        {validationErrors.source && <p className="text-red-500 text-sm mt-1">{validationErrors.source}</p>}
                    </div>

                    <div>
                        <p className="block text-sm font-medium text-gray-700">Do you have a valid Driving License?</p>
                        <div className="mt-2 space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="license"
                                    value="yes"
                                    checked={hasLicense === true}
                                    onChange={() => setHasLicense(true)}
                                    className="form-radio text-yellow-500"
                                    required
                                />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="license"
                                    value="no"
                                    checked={hasLicense === false}
                                    onChange={() => setHasLicense(false)}
                                    className="form-radio text-yellow-500"
                                    required
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                        {validationErrors.hasLicense && <p className="text-red-500 text-sm mt-1">{validationErrors.hasLicense}</p>}
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Enter Phone number
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
                        />
                        {validationErrors.phoneNumber && <p className="text-red-500 text-sm mt-1">{validationErrors.phoneNumber}</p>}
                    </div>

                    {!otpSent ? (
                        <button
                            type="button"
                            onClick={handleGetOtp}
                            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
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
                                onChange={(e) => setOtp(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                required
                                pattern="[0-9]{6}"
                                placeholder="Enter 6-digit OTP"
                            />
                            {validationErrors.otp && <p className="text-red-500 text-sm mt-1">{validationErrors.otp}</p>}
                            <button
                                type="submit"
                                className="mt-4 w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}

                    {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                </form>
            </div>

            <div className="mt-8 text-black text-center">
                <p className="font-bold text-xl mb-2">India's Largest Bike Taxi Service</p>
                <p className="text-sm">Fast, Safe and Affordable</p>
            </div>
        </div>
    );
};

export default CaptainSignup;
