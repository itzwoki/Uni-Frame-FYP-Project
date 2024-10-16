const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user; // Attach user's data to request object
        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        }
        if (err instanceof JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.error('Authentication error:', err);
        res.status(401).json({ message: 'Authentication error' });
    }
};

module.exports = authMiddleware;
