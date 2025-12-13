const express = require('express');
const router = express.Router();
const SweetsController = require('../controllers/sweetsController');

const sweetsController = new SweetsController();

// Route to get all sweets
router.get('/', sweetsController.getAllSweets);

// Route to add a new sweet
router.post('/', sweetsController.addSweet);

// Route to search sweets
router.get('/search', sweetsController.searchSweets);

// Route to update a sweet by ID
router.put('/:id', sweetsController.updateSweet);

// Route to delete a sweet by ID
router.delete('/:id', sweetsController.deleteSweet);

module.exports = router;