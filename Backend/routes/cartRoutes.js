// backend/routes/cartRoutes.js
const express = require('express');
const cartController = require('../controllers/cartController');
const { protect, customerOnly } = require('../middleware/authMiddleware');
const router = express.Router();

//Customer routes
router.get('/', protect, customerOnly, cartController.getCart);
router.post('/add', protect, customerOnly, cartController.addItem);
router.post('/remove', protect, customerOnly, cartController.removeItem);
router.post('/clear', protect, customerOnly, cartController.clearCart);
router.post('/update', protect, customerOnly, cartController.updateItemQuantity);

module.exports = router;
