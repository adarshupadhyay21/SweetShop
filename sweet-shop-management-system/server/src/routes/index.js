const express = require('express');
const router = express.Router();

const sweetsRoutes = require('./sweets');
const authRoutes = require('./auth');

// Use auth routes
router.use('/auth', authRoutes);

// Use sweets routes
router.use('/sweets', sweetsRoutes);

module.exports = router;