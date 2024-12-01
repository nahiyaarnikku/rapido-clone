const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// Protected route: Get user profile
router.get('/profile', verifyToken, getUserProfile);

module.exports = router;
