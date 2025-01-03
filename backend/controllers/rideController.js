const Ride = require('../models/rideModel');
const User = require('../models/userModel');
const Captain = require('../models/captainModel');
const asyncHandler = require('express-async-handler');

// Book a ride
const bookRide = async (req, res) => {
    const { userId, captainId, startLocation, endLocation, price, time, distance } = req.body;
    try {
        // Check if captain exists
        const captain = await Captain.findById(captainId);
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        // Create a new ride
        const ride = new Ride({
            user: userId,
            captain: captainId,
            startLocation,
            endLocation,
            price,
            time,
            distance,
            status: 'pending', // Ride starts in a pending status
        });

        // Save the ride and update the captain's approvedRides
        const savedRide = await ride.save();
        // captain.approvedRides.push(savedRide._id);
        // await captain.save();

        // Update user history
        // const user = await User.findById(req.user._id);
        // user.history.push(savedRide._id);
        // await user.save();

        res.status(201).json(savedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the status of a ride (e.g., captain approves or cancels the ride)
const updateRideStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const ride = await Ride.findById(id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Only captains should be able to update the status
        // if (ride.captain.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: 'Not authorized to update this ride' });
        // }

        ride.status = status;
        await ride.save();

        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get details of a ride
const getRideDetails = async (req, res) => {
    const { id } = req.params;
    try {
        // const ride = await Ride.findById(id).populate('captain').populate('user');
        const ride = await Ride.findById(id);
        if (!ride) {
            return res.json({ message: 'Ride not found' });
        }

        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel a ride
const cancelRide = async (req, res) => {
    const { id } = req.params;
    try {
        const _id = new ObjectId(id)
        const ride = await Ride.findById(_id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Only the user who booked the ride or the captain can cancel the ride
        // if (ride.user.toString() !== req.user._id.toString() && ride.captain.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ message: 'Not authorized to cancel this ride' });
        // }

        ride.status = 'cancelled';
        await ride.save();

        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Pending Rides by Captain
const findRides = asyncHandler(async (req, res) => {
    const { captainId } = req.params; // Assuming captainId is passed as a route parameter

    if (!captainId) {
        return res.status(200).json({ message: 'Captain ID is required' });
    }

    try {
        // Get today's date start and end time
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00 for the start of the day

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); // Set time to 23:59:59 for the end of the day

        // Find rides that are pending, assigned to the specific captain, and created today
        const rides = await Ride.find({
            status: 'pending',
            captain: captainId,
            createdAt: { $gte: startOfDay, $lte: endOfDay } // Filter rides by today's date
        });

        if (rides.length === 0) {
            return res.status(200).json({ message: 'No pending rides available for this captain today' });
        }

        res.status(200).json({
            result: "Success",
            count: rides.length,
            message: 'Pending rides for the captain found today',
            data: rides,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching rides',
            error: error.message,
        });
    }
});


module.exports = {
    findRides,
    bookRide,
    updateRideStatus,
    getRideDetails,
    cancelRide,
};
