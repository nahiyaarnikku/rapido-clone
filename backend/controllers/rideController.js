const Ride = require('../models/rideModel');
const User = require('../models/userModel');
const Captain = require('../models/captainModel');

// Book a ride
const bookRide = async (req, res) => {
    const { captainId, pickupLocation, dropLocation, price, time } = req.body;
    try {
        // Check if captain exists
        const captain = await Captain.findById(captainId);
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        // Create a new ride
        const ride = new Ride({
            user: req.user._id,
            captain: captainId,
            pickupLocation,
            dropLocation,
            price,
            time,
            status: 'pending', // Ride starts in a pending status
        });

        // Save the ride and update the captain's approvedRides
        const savedRide = await ride.save();
        captain.approvedRides.push(savedRide._id);
        await captain.save();

        // Update user history
        const user = await User.findById(req.user._id);
        user.history.push(savedRide._id);
        await user.save();

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
        if (ride.captain.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this ride' });
        }

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
        const ride = await Ride.findById(id).populate('captain').populate('user');
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
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
        const ride = await Ride.findById(id);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Only the user who booked the ride or the captain can cancel the ride
        if (ride.user.toString() !== req.user._id.toString() && ride.captain.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to cancel this ride' });
        }

        ride.status = 'cancelled';
        await ride.save();

        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookRide,
    updateRideStatus,
    getRideDetails,
    cancelRide,
};
