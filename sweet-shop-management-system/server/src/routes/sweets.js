const express = require('express');
const router = express.Router();

const SweetsController = require('../controllers/sweetsController');
const sweetService = require('../services/sweetService');
const { check, validationResult } = require('express-validator');

// ✅ Pass service into controller
const sweetsController = new SweetsController(sweetService);

// ✅ Bind methods so `this` works
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
// Public GET endpoints (listing/searching/viewing a single sweet)
router.get('/', sweetsController.getAllSweets.bind(sweetsController));
const runValidation = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	next();
};

// Create (admin only)
router.post('/', [
	auth, admin,
	check('name').isLength({ min: 2 }).withMessage('Name is required'),
	check('category').isIn(['chocolates', 'candies', 'gummies', 'lollipops', 'others']).withMessage('Invalid category'),
	check('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
	check('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
	check('image').optional().isURL().withMessage('Image must be a valid URL')
], runValidation, sweetsController.addSweet.bind(sweetsController));
// Support both: /search?q=term and /search/:query
router.get('/search', sweetsController.searchSweets.bind(sweetsController));
router.get('/search/:query', sweetsController.searchSweets.bind(sweetsController));
router.get('/categories', sweetsController.getCategories.bind(sweetsController));

// Single sweet (public)
router.get('/:id', sweetsController.getSweetById.bind(sweetsController));


// Inventory actions
router.post('/:id/purchase', [auth, check('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be >=1'), runValidation], sweetsController.purchaseSweet.bind(sweetsController));
router.post('/:id/restock', [auth, admin, check('quantity').isInt({ min: 1 }).withMessage('Quantity to restock must be >=1'), runValidation], sweetsController.restockSweet.bind(sweetsController));
router.put('/:id', [auth, admin,
	check('name').optional().isLength({ min: 2 }).withMessage('Invalid name'),
	check('category').optional().isIn(['chocolates', 'candies', 'gummies', 'lollipops', 'others']).withMessage('Invalid category'),
	check('price').optional().isFloat({ min: 0 }).withMessage('Invalid price'),
	check('quantity').optional().isInt({ min: 0 }).withMessage('Invalid quantity'),
	check('image').optional().isURL().withMessage('Image must be a valid URL')
], runValidation, sweetsController.updateSweet.bind(sweetsController));
router.delete('/:id', auth, admin, sweetsController.deleteSweet.bind(sweetsController));

module.exports = router;
