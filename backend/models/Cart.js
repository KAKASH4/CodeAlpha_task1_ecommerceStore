const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    unique: true, // Ensures each product is added only once
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  image_path: String,
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model('CartItem', CartItemSchema);
