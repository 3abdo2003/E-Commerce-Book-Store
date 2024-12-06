const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, adminOnly, customerOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// Customer-only routes
router.post('/checkout', protect, customerOnly, orderController.checkout);
router.post('/create-checkout-session', protect, customerOnly, orderController.createCheckoutSession);
router.get('/checkout-success', protect, customerOnly, orderController.checkoutSuccess); // Updated route for successful payment
router.get('/user-orders', protect, customerOnly, orderController.getUserOrders);

// General route accessible by authenticated users
router.get('/:id', protect, orderController.getOrderById);


// Admin-only route for updating order status
router.put('/:id/status', protect, adminOnly, orderController.updateOrderStatus);

module.exports = router;