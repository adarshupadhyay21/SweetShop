module.exports = (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'No user context' });
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
