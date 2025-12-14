const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        let decoded;
        try {
            decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // ensure user still exists and get current role
        const user = await User.findById(decoded.id).select('name email role');
        if (!user) return res.status(401).json({ message: 'User not found' });

        req.user = { id: user._id.toString(), email: user.email, role: user.role };
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;