// backend/controllers/cartController.js
const CartService = require('../services/cartService');

exports.getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await CartService.getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve cart.' });
  }
};

exports.addItem = async (req, res) => {
  const userId = req.user._id;
  const { bookId, quantity } = req.body;

  try {
    const updatedCart = await CartService.addItemToCart(userId, bookId, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item to cart.' });
  }
};

exports.removeItem = async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.body;

  try {
    const updatedCart = await CartService.removeItemFromCart(userId, bookId);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from cart.' });
  }
};

exports.clearCart = async (req, res) => {
  const userId = req.user._id;

  try {
    await CartService.clearCart(userId);
    res.status(200).json({ message: 'Cart cleared successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart.' });
  }
};

exports.updateItemQuantity = async (req, res) => {
  const userId = req.user._id;
  const { bookId, quantity } = req.body;

  try {
    const updatedCart = await CartService.updateQuantity(userId, bookId, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item quantity in cart.' });
  }
};