const CartItem=require('../models/Cart');
const Order=require("../models/Order");
exports.add= async (req, res) => {
    const { product_id, name, description, price, image_path, quantity } = req.body;
  
    try {
      // Check if the product already exists in the cart
      const existingItem = await CartItem.findOne({ product_id });
  
      if (existingItem) {
        // Update the quantity if the product already exists
        existingItem.quantity += quantity;
        await existingItem.save();
      } else {
        // Add a new product to the cart
        const newCartItem = new CartItem({ product_id, name, description, price, image_path, quantity });
        await newCartItem.save();
      }
  
      res.json({ message: 'Product added to cart successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add product to cart.' });
    }
  }


exports.getAll=async (req, res) => {
    try {
      const cartItems = await CartItem.find();
      res.json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch cart items.' });
    }
  };

exports.deleteItem=async (req, res) => {
    const { product_id } = req.params;
  
    try {
      await CartItem.findOneAndDelete({ product_id });
      res.json({ message: 'Product deleted from cart successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete product from cart.' });
    }
  }
  
exports.checkout=async (req, res) => {
    try {
      // Fetch all cart items
      const cartItems = await CartItem.find();
  
      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty.' });
      }
  
      // Calculate total price
      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
      // Create a new order
      const newOrder = new Order({
        items: cartItems.map(({ product_id, name, price, quantity }) => ({ product_id, name, price, quantity })),
        total_price: totalPrice,
      });
      await newOrder.save();
  
      // Clear the cart
      await CartItem.deleteMany();
  
      res.json({ message: 'Order placed successfully.', order: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to place the order.' });
    }
  }


  exports.updateCartQuantity = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
  
    try {
      // Find the cart item by product ID and update its quantity
      const cartItem = await CartItem.findOne({ product_id: productId });
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Product not found in cart.' });
      }
  
      // Update the quantity
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.json({ message: 'Cart quantity updated successfully.', cartItem });
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      res.status(500).json({ message: 'Failed to update cart quantity.', error });
    }
  };