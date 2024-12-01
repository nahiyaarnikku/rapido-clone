const express = require('express');
const router = express.Router();
const {
    getUserAndCaptainCount,
    getIncomeDetails,
    getUserDetails,
    getCaptainDetails,
    getHelpRequests,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Routes for admin
router.get('/count', protect, getUserAndCaptainCount); // Get total number of users and captains
router.get('/income', protect, getIncomeDetails); // Get overall income
router.get('/user/:id', protect, getUserDetails); // Get details of a user
router.get('/captain/:id', protect, getCaptainDetails); // Get details of a captain
router.get('/help', protect, getHelpRequests); // Get all help requests from users

module.exports = router;
