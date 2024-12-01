const asyncHandler = require('express-async-handler');
const Captain = require('../models/captainModel');
const generateToken = require('../utils/generateToken');

// @desc Register a new captain
// @route POST /api/captains/register
// @access Public
const registerCaptain = asyncHandler(async (req, res) => {
    const { name, email, password, phone, vehicleDetails } = req.body;

    // Check if captain already exists
    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
        res.json({
            result: "Error",
            message: "Captain already exists"
        })
    }

    // Create new captain
    const captain = await Captain.create({
        name,
        email,
        password,
        phone,
        vehicleDetails, // Store vehicle details
    });

    if (captain) {
        res.status(201).json({
            result: "Success",
            message: "Captain registered successfully",
            _id: captain._id,
            name: captain.name,
            email: captain.email,
            phone: captain.phone,
            vehicleDetails: captain.vehicleDetails, // Include vehicle details in the response
            token: generateToken(captain._id),
        });
    } else {
        res.json({
            result: "Error",
            message: "Invalid captain data"
        })
    }
});

// @desc Authenticate a captain & get a token
// @route POST /api/captains/login
// @access Public
const loginCaptain = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for captain
    const captain = await Captain.findOne({ email });

    if (captain && (await captain.matchPassword(password))) {
        res.json({
            result: "Success",
            message: "Captain logged in successfully",
            _id: captain._id,
            name: captain.name,
            email: captain.email,
            phone: captain.phone,
            vehicleDetails: captain.vehicleDetails, // Return vehicle details
            token: generateToken(captain._id),
        });
    } else {
        res.json({
            result: "Error",
            message: "Email or Password incorrect"
        })
    }
});

// @desc Get captain profile
// @route GET /api/captains/profile
// @access Private
const getCaptainProfile = asyncHandler(async (req, res) => {
    const captain = await Captain.findById(req.user._id);

    if (captain) {
        res.json({
            _id: captain._id,
            name: captain.name,
            email: captain.email,
            phone: captain.phone,
            wallet: captain.wallet,
            vehicleDetails: captain.vehicleDetails, // Include vehicle details in profile
            rating: captain.rating,
        });
    } else {
        res.status(404);
        throw new Error('Captain not found');
    }
});

// @desc Update captain profile
// @route PUT /api/captains/profile
// @access Private
const updateCaptainProfile = asyncHandler(async (req, res) => {
    const captain = await Captain.findById(req.user._id);

    if (captain) {
        captain.name = req.body.name || captain.name;
        captain.email = req.body.email || captain.email;
        captain.phone = req.body.phone || captain.phone;
        captain.vehicleDetails = req.body.vehicleDetails || captain.vehicleDetails; // Update vehicle details
        captain.wallet = req.body.wallet || captain.wallet;

        if (req.body.password) {
            captain.password = req.body.password;
        }

        const updatedCaptain = await captain.save();

        res.json({
            _id: updatedCaptain._id,
            name: updatedCaptain.name,
            email: updatedCaptain.email,
            phone: updatedCaptain.phone,
            vehicleDetails: updatedCaptain.vehicleDetails, // Include updated vehicle details
            wallet: updatedCaptain.wallet,
            rating: updatedCaptain.rating,
            token: generateToken(updatedCaptain._id),
        });
    } else {
        res.status(404);
        throw new Error('Captain not found');
    }
});

module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    updateCaptainProfile,
};
