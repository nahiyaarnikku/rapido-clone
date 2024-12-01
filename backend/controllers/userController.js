const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        res.status(400).json({
            message: 'Provide missing missing feilds',
            name: name, email: email, password: password, phone: phone
        })
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(201).json({
            result: "Error",
            message: `User already exists ${email}`
        })
    }

    const user = await User.create({ name, email, password, phone });

    if (user) {
        res.status(201).json({
            result: "Success",
            message: {
                _id: user._id,
                name: user.name,
                email: user.email,
                wallet: user.wallet,
                token: generateToken(user._id),
            },
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            result: "Success",
            message: {
                _id: user._id,
                name: user.name,
                email: user.email,
                wallet: user.wallet,
                phone: user.phone,
                token: generateToken(user._id),
            },
        });
    } else {
        res.json({
            result: "Error",
            message: "Email or Password incorrect"
        });
    }
});

// Controller function to get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user); // The user ID is attached by the verifyToken middleware

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user profile details
        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            wallet: user.wallet,
            rideHistory: user.rideHistory
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
