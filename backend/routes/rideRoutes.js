const express = require('express');
const router = express.Router();
const {
    bookRide,
    updateRideStatus,
    getRideDetails,
    cancelRide,
} = require('../controllers/rideController');
const { protect } = require('../middleware/authMiddleware');

// Routes for rides
router.post('/book', protect, bookRide); // Book a ride
router.put('/update/:id', protect, updateRideStatus); // Update the ride status (captain can approve, cancel, etc.)
router.get('/:id', protect, getRideDetails); // Get ride details by ID
router.delete('/cancel/:id', protect, cancelRide); // Cancel a ride

module.exports = router;
