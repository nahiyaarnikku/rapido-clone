const express = require('express');
const router = express.Router();
const {
    bookRide,
    updateRideStatus,
    getRideDetails,
    cancelRide,
    findRides,
} = require('../controllers/rideController');
const { protect } = require('../middleware/authMiddleware');

// Routes for rides
router.post('/book', bookRide); // Book a ride
router.get('/find/:captainId', findRides); // Find all ride
router.put('/update/:id', updateRideStatus); // Update the ride status (captain can approve, cancel, etc.)
router.get('/:id', getRideDetails); // Get ride details by ID
router.delete('/cancel/:id', protect, cancelRide); // Cancel a ride

module.exports = router;
