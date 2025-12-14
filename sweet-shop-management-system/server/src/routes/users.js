const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// GET /api/users - list users (admin only)
router.get('/', auth, userController.listUsers.bind(userController));

// POST /api/users/:id/promote - promote user to admin (admin only)
router.post('/:id/promote', auth, userController.promoteToAdmin.bind(userController));

module.exports = router;
