// backend/services/cartService.js
const Cart = require('../models/Cart');
const Book = require('../models/Book');  // Assuming you have a Book model

// Get cart by user ID
exports.getCartByUserId = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.bookId');
  return cart;
};

// Add to cart
exports.addToCart = async (userId, bookId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  const book = await Book.findById(bookId);

  if (!book) throw new Error('Book not found');
  if (book.stock < quantity) throw new Error('Not enough stock available');

  // Check if the book is already in the cart
  const bookIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
  if (bookIndex > -1) {
    cart.items[bookIndex].quantity += quantity;  // Update quantity if the book is already in the cart
  } else {
    cart.items.push({ bookId, quantity }); // Add new book to cart
  }

  await cart.save();
  return cart;
};

// Remove from cart
exports.removeFromCart = async (userId, bookId) => {
  const cart = await Cart.findOne({ user: userId });
  const bookIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);

  if (bookIndex === -1) return null;

  cart.items.splice(bookIndex, 1);  // Remove item from cart
  await cart.save();
  return cart;
};

// Clear the cart (for checkout)
exports.clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  cart.items = [];  // Clear all items
  await cart.save();
  return cart;
};
