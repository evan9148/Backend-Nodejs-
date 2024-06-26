const cartItem = require('../models/cart');
exports.getUserCart = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from JWT payload
        const cartItems = await cartItem.find({ user: userId }).populate('product');
        res.json(cartItems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Add items to the cart...
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user; // Extracted from JWT payload

    try {
        // Check if product already exists in user's cart
        let cartItem = await cartItem.findOne({ user: userId, product: productId });

        if (cartItem) {
            // Update quantity if item exists
            cartItem.quantity += quantity;
        } else {
            // Create new cart item
            cartItem = new CartItem({
                user: userId,
                product: productId,
                quantity
            });
        }

        // Save cart item
        await cartItem.save();
        res.json(cartItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// delete the cart...
exports.removeFromCart = async (req, res) => {
    const cartItemId = req.params.id;
    const userId = req.user.id; // Extracted from JWT payload

    try {
        // Check if cart item exists
        let cartItem = await cartItem.findById(cartItemId);

        if (!cartItem) {
            return res.status(404).json({ msg: 'Cart item not found' });
        }

        // Check ownership
        if (cartItem.user.toString() !== userId) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Remove cart item
        await cartItem.remove();
        res.json({ msg: 'Cart item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
