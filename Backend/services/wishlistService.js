// backend/services/wishlistService.js
const Wishlist = require('../models/Wishlist');
const Book = require('../models/Book');

exports.getWishlistByUserId = async (userId) => {
  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('books');
    if (!wishlist) {
      return { books: [] };
    }
    return wishlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addToWishlist = async (userId, bookId) => {
  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, books: [] });
    }

    const existingBook = wishlist.books.find(book => book.toString() === bookId);
    if (existingBook) {
      throw new Error('Book already in wishlist');
    }

    wishlist.books.push(bookId);
    await wishlist.save();
    return wishlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.removeFromWishlist = async (userId, bookId) => {
  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) throw new Error('Wishlist not found');

    wishlist.books = wishlist.books.filter(book => book.toString() !== bookId);
    await wishlist.save();

    return wishlist;
  } catch (error) {
    throw new Error(error.message);
  }
};
