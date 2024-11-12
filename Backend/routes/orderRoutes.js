// backend/routes/orderRoutes.js
const express = require('express');
const { createOrder, getOrderById, getUserOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// User Order Routes
router.post('/', protect, createOrder);        
router.get('/:id', protect, getOrderById);       
router.get('/', protect, getUserOrders);        

// Admin Routes (Protected)
router.put('/:id/status', protect, adminOnly, updateOrderStatus); // Admin can update order status

module.exports = router;
