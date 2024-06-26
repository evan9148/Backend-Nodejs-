const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/add', productController.addProduct);
router.get('/viewById/:id', productController.getProductById);

module.exports = router;