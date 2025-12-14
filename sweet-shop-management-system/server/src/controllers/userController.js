const User = require('../models/user.model');

class UserController {
    async listUsers(req, res) {
        try {
            // admin only
            if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
            const users = await User.find({}, 'name email role createdAt');
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async promoteToAdmin(req, res) {
        try {
            if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            user.role = 'admin';
            await user.save();
            res.json({ message: 'User promoted', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new UserController();
