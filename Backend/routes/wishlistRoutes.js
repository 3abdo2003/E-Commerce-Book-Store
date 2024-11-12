// backend/routes/wishlistRoutes.js
const express = require('express');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { protect, customerOnly } = require('../middleware/authMiddleware');

const router = express.Router();
// User Wishlist Routes
router.get('/', protect, customerOnly, getWishlist);         
router.post('/add', protect, customerOnly, addToWishlist);      
router.delete('/remove/:id', protect, customerOnly, removeFromWishlist); 

module.exports = router;
