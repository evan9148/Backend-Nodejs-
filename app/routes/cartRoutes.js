const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getUserCart);
router.post('/add', cartController.addToCart);
router.delete('/remove/:id', cartController.removeFromCart);

module.exports = router;