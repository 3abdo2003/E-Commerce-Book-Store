// backend/routes/wishlistRoutes.js
const express = require('express');
const wishlistController = require('../controllers/wishlistController');
const { protect, customerOnly } = require('../middleware/authMiddleware');

const router = express.Router();
// Customer Wishlist Routes
router.get('/', protect, customerOnly, wishlistController.getWishlist);         
router.post('/add', protect, customerOnly, wishlistController.addToWishlist);      
router.delete('/remove/:id', protect, customerOnly, wishlistController.removeFromWishlist); 

module.exports = router;
