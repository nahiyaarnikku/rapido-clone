const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    getIncomeDetails,
    getUserDetails,
    getCaptainDetails,
    getHelpRequests,
    loginAdmin,
    getCounts,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Routes for admin
router.post('/register', registerAdmin); // Register admin
router.post('/login', loginAdmin); // login admin
router.get('/income', protect, getIncomeDetails); // Get overall income
// router.get('/user/:id', protect, getUserDetails); // Get details of a user
router.get('/user/:id', getUserDetails); // Get details of a user
router.get('/captain/:id', getCaptainDetails); // Get details of a captain
router.get('/help', protect, getHelpRequests); // Get all help requests from users
router.get('/counts', getCounts); // Route to get counts

module.exports = router;