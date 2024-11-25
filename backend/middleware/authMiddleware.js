const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Captain = require('../models/captainModel');

// Protect routes with JWT authentication
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if token exists in the request header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (Format: Bearer <token>)
            token = req.headers.authorization.split(' ')[1];

            // Decode the token and get the user (captain) id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get captain's details from the database
            req.user = await Captain.findById(decoded.id).select('-password');

            next(); // Allow access to the next middleware or route handler
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };
