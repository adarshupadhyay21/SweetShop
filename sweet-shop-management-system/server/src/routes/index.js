const express = require('express');
const router = express.Router();

const sweetsRoutes = require('./sweets');

// Use sweets routes
router.use('/sweets', sweetsRoutes);

module.exports = router;