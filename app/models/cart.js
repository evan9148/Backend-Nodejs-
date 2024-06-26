const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, ref: 'User', 
        required: true 
    },
    product: { 
        type: Schema.Types.ObjectId, ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        default: 1 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('CartItem', CartItemSchema);