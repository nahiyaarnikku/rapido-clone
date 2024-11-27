import React, { useState } from 'react';
import './CaptainSignup.css';
import logo from '../../Assets/logo.jpeg';
import { BaseUrl } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainSignup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [source, setSource] = useState('');
    const [hasLicense, setHasLicense] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const navigate = useNavigate();

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

        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = 'Please enter a valid email address.';
        }

        if (!password || password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
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

        if (!vehicleType) {
            errors.vehicleType = 'Vehicle type is required.';
        }

        if (!vehicleNumber) {
            errors.vehicleNumber = 'Vehicle number is required.';
        }

        if (!vehicleModel) {
            errors.vehicleModel = 'Vehicle model is required.';
        }

        return errors;
    };

    // Name change handler with character validation
    const handleNameChange = (e) => {
        const value = e.target.value.replace(/[^A-Za-z\s]/g, '');
        setFullName(value);
    };

    // Form submission handler with API integration
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});
        setError('');

        const data = JSON.stringify({
            name: fullName,
            email: email,
            password: password,
            phone: phoneNumber,
            vehicleDetails: {
                type: vehicleType,
                vehicleNumber: vehicleNumber,
                vehicleModel: vehicleModel,
            },
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/captains/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        try {
            const response = await axios.request(config);
            if (response.data.result === 'Success') {
                localStorage.setItem('token', response.data.token);
                navigate('/captaindashboard');
            }
            if(response.data.result == 'Error'){
                setError(() => response.data.message);
                return;
            }
            setFullName('');
            setEmail('');
            setPassword('');
            setPhoneNumber('');
            setCity('');
            setSource('');
            setHasLicense(null);
            setVehicleType('');
            setVehicleNumber('');
            setVehicleModel('');
        } catch (error) {
            console.error('Error during signup:', error.response?.data || error.message);
            setError('Failed to register. Please try again.');
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
                    {/* Full Name */}
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

                    {/* Email */}
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
                            placeholder="Enter your email"
                        />
                        {validationErrors.email && <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>}
                    </div>

                    {/* Password */}
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
                            placeholder="Enter your password"
                        />
                        {validationErrors.password && <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>}
                    </div>

                    {/* Phone Number */}
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

                    {/* City */}
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

                    {/* How Did You Find Us */}
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

                    {/* Driving License */}
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

                    {/* Vehicle Type */}
                    <div>
                        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
                            Vehicle Type
                        </label>
                        <select
                            id="vehicleType"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        >
                            <option value="">Select a vehicle type</option>
                            <option value="auto">Auto</option>
                            <option value="bike">Bike</option>
                        </select>
                        {validationErrors.vehicleType && <p className="text-red-500 text-sm mt-1">{validationErrors.vehicleType}</p>}
                    </div>

                    {/* Vehicle Number */}
                    <div>
                        <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">
                            Vehicle Number
                        </label>
                        <input
                            type="text"
                            id="vehicleNumber"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                            placeholder="Enter your vehicle number"
                        />
                        {validationErrors.vehicleNumber && <p className="text-red-500 text-sm mt-1">{validationErrors.vehicleNumber}</p>}
                    </div>

                    {/* Vehicle Model */}
                    <div>
                        <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700">
                            Vehicle Model
                        </label>
                        <input
                            type="text"
                            id="vehicleModel"
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                            placeholder="Enter your vehicle model"
                        />
                        {validationErrors.vehicleModel && <p className="text-red-500 text-sm mt-1">{validationErrors.vehicleModel}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button onClick={(e) => handleSubmit(e)} type="submit" className="bg-yellow-400 text-white font-bold py-2 px-4 rounded-md shadow inline-block">
                            Register
                        </button>
                    </div>

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
