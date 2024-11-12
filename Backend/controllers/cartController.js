// backend/controllers/cartController.js
const CartService = require('../services/cartService');

// Get the user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await CartService.getCartByUserId(req.user._id); // Ensure user is logged in before accessing cart
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a book to the cart
exports.addToCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'You must be signed in to add items to your cart.' });
    }
    const { bookId, quantity } = req.body;
    // Check if the book is available
    const cart = await CartService.addToCart(req.user._id, bookId, quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a book from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;  // Get book ID from params
    const cart = await CartService.removeFromCart(req.user._id, bookId);  // Service handles removal logic
    if (!cart) {
      return res.status(404).json({ message: 'Book not found in cart' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Checkout the cart
exports.checkout = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'You must be signed in to checkout.' });
    }
    const cart = await CartService.getCartByUserId(req.user._id);
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }
    await CartService.clearCart(req.user._id);
    res.status(200).json({ message: 'Checkout successful!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
