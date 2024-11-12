// backend/controllers/wishlistController.js
const WishlistService = require('../services/wishlistService');

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistService.getWishlistByUserId(req.user._id);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistService.addToWishlist(req.user._id, req.body.bookId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistService.removeFromWishlist(req.user._id, req.params.id);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
