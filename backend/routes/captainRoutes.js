const express = require('express');
const router = express.Router();
const {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    updateCaptainProfile,
    findCaptainByVehicleType, // Import the update function
} = require('../controllers/captainController');
const { protect } = require('../middleware/authMiddleware');

// Routes for captain
router.post('/register', registerCaptain); // Register a new captain
router.post('/login', loginCaptain); // Login for the captain
router.get('/find-by-vehicle', findCaptainByVehicleType ); // Find captains
router.get('/profile', protect, getCaptainProfile); // Get the captain's profile (protected route)
router.put('/profile', protect, updateCaptainProfile); // Update captain's profile (protected route)

module.exports = router;
