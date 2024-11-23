const User = require('../models/userModel');
const Captain = require('../models/captainModel');
const Ride = require('../models/rideModel');

// Get the total number of users and captains
const getUserAndCaptainCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const captainCount = await Captain.countDocuments();
        res.status(200).json({ userCount, captainCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
        res.status(200).json(user);
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
        res.status(200).json(captain);
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

module.exports = {
    getUserAndCaptainCount,
    getIncomeDetails,
    getUserDetails,
    getCaptainDetails,
    getHelpRequests,
};
