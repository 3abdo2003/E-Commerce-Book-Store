// backend/routes/cartRoutes.js
const express = require('express');
const { getCart, addToCart, removeFromCart, checkout } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware'); // Middleware to ensure user is signed in

const router = express.Router();

// User Cart Routes
router.get('/', protect, getCart);             
router.post('/add', protect, addToCart);         
router.delete('/remove/:bookId', protect, removeFromCart);  
router.post('/checkout', protect, checkout);

module.exports = router;
