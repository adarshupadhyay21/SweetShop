const express = require('express');
const router = express.Router();

const sweetsRoutes = require('./sweets');
const authRoutes = require('./auth');
const usersRoutes = require('./users');

// Use auth routes
router.use('/auth', authRoutes);

// Use sweets routes
router.use('/sweets', sweetsRoutes);

// User management (admin)
router.use('/users', usersRoutes);

module.exports = router;