const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    getUserAndCaptainCount,
    getIncomeDetails,
    getUserDetails,
    getCaptainDetails,
    getHelpRequests,
    loginAdmin,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Routes for admin
router.post('/register', registerAdmin); // Register admin
router.post('/login', loginAdmin); // login admin
router.get('/count', protect, getUserAndCaptainCount); // Get total number of users and captains
router.get('/income', protect, getIncomeDetails); // Get overall income
router.get('/user/:id', protect, getUserDetails); // Get details of a user
router.get('/captain/:id', protect, getCaptainDetails); // Get details of a captain
router.get('/help', protect, getHelpRequests); // Get all help requests from users

module.exports = router;
