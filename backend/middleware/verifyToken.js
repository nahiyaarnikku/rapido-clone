const jwt = require('jsonwebtoken');

// Middleware to check JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.id; // Attach the user ID to the request object
        next(); // Continue to the next middleware/route handler
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
