const Product = require('../models/Product');

// add product data...
exports.addProduct = async (req, res) => {
    const { name, price, description } = req.body;

    try {
        // Create a new product instance
        const newProduct = new Product({
            name,
            price,
            description
        });

        // Save the product to the database
        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully!', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product' });
    }
};


// get api...
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// get data through productid...
exports.getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};