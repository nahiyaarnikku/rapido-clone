const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

module.exports = { getUsers, createUser };
