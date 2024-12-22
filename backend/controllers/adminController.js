const User = require('../models/userModel');
const Captain = require('../models/captainModel');
const Ride = require('../models/rideModel');
const Admin = require('../models/adminModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

// Register Administrator
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) res.json({ result: 'Error', message: 'Provide admin details' });

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        res.json({
            result: "Error",
            message: "Admin already exists"
        })
    }

    // Create new admin
    const admin = await Admin.create({
        name,
        email,
        password
    });

    if (admin) {
        res.status(201).json({
            result: "Success",
            message: "Admin registered successfully",
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } else {
        res.json({
            result: "Error",
            message: "Invalid admin data"
        })
    }
});

// login admin
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for admin
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            result: "Success",
            message: "Admin logged in successfully",
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } else {
        res.json({
            result: "Error",
            message: "Email or Password incorrect"
        })
    }
});

// Get the overall income (sum of all completed rides)
const getIncomeDetails = async (req, res) => {
    try {
        const completedRides = await Ride.find({ status: 'completed' });

        let totalIncome = 0;
        completedRides.forEach((ride) => {
            totalIncome += ride.price; // Assuming price is stored in the ride document
        });

        res.status(200).json({ totalIncome });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get details of a user by their ID
const getUserDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ result: "SUCCESS", message: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get details of a captain by their ID
const getCaptainDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const captain = await Captain.findById(id);
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }
        res.status(200).json({ result: "SUCCESS", message: captain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all help requests from users
const getHelpRequests = async (req, res) => {
    try {
        const helpRequests = await User.find({ 'helpRequest.status': 'pending' }); // Assuming helpRequest is a field in the User model
        res.status(200).json(helpRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// API to get total counts of users and captains
const getCounts = asyncHandler(async (req, res) => {
    try {
        const userCount = await User.countDocuments(); // Count total users
        const captainCount = await Captain.countDocuments(); // Count total captains

        res.status(200).json({
            result: "SUCCESS",
            message: {
                totalUsers: userCount,
                totalCaptains: captainCount,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving counts',
            error: error.message,
        });
    }
});

module.exports = {
    registerAdmin,
    loginAdmin,
    getIncomeDetails,
    getUserDetails,
    getCaptainDetails,
    getHelpRequests,
    getCounts
};