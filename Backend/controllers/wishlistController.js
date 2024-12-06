// backend/controllers/wishlistController.js
const wishlistService = require('../services/wishlistService');

// Get the user's wishlist
exports.getWishlist = async (req, res) => {
  const userId = req.user._id;
  try {
    const wishlist = await wishlistService.getWishlistByUserId(userId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

// Add a book to the user's wishlist
exports.addToWishlist = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user._id;
  try {
    const wishlist = await wishlistService.addToWishlist(userId, bookId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a book from the user's wishlist
exports.removeFromWishlist = async (req, res) => {
  const { id: bookId } = req.params;  // using 'id' param to match the route
  const userId = req.user._id;
  try {
    const wishlist = await wishlistService.removeFromWishlist(userId, bookId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
