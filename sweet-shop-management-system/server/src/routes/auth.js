const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

const runValidation = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	next();
};

// POST /api/auth/register
router.post('/register', [
	check('name').isLength({ min: 2 }).withMessage('Name is required'),
	check('email').isEmail().withMessage('Valid email required'),
	check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
	check('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
], runValidation, register);

// POST /api/auth/login
router.post('/login', [
	check('email').isEmail().withMessage('Valid email required'),
	check('password').exists().withMessage('Password required')
], runValidation, login);

module.exports = router;
