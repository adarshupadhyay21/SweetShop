const express = require('express');
const router = express.Router();

const SweetsController = require('../controllers/sweetsController');
const sweetService = require('../services/sweetService');

// ✅ Pass service into controller
const sweetsController = new SweetsController(sweetService);

// ✅ Bind methods so `this` works
router.get('/', sweetsController.getAllSweets.bind(sweetsController));
router.post('/', sweetsController.addSweet.bind(sweetsController));
router.get('/search/:query', sweetsController.searchSweets.bind(sweetsController));
router.put('/:id', sweetsController.updateSweet.bind(sweetsController));
router.delete('/:id', sweetsController.deleteSweet.bind(sweetsController));

module.exports = router;
