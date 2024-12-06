// backend/services/cartService.js
const Cart = require('../models/Cart');

exports.getCartByUserId = async (userId) => {
  return Cart.findOne({ user: userId }).populate('items.book');
};

exports.addItemToCart = async (userId, bookId, quantity) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(item => item.book.equals(bookId));
  if (itemIndex >= 0) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ book: bookId, quantity });
  }

  return cart.save();
};

exports.removeItemFromCart = async (userId, bookId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error('Cart not found');

  cart.items = cart.items.filter(item => !item.book.equals(bookId));
  return cart.save();
};

exports.clearCart = async (userId) => {
  return Cart.findOneAndUpdate({ user: userId }, { items: [] });
};

exports.updateQuantity = async (userId, bookId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  const item = cart.items.find(i => i.book.toString() === bookId);
  if (!item) throw new Error('Book not found in cart');

  item.quantity = quantity;
  await cart.save();
  return cart;
};