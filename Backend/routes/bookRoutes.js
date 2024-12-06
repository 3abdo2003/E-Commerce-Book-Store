// backend/routes/bookRoutes.js
const express = require('express');
const bookController= require('../controllers/bookController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();
// Public Routes
router.get('/', bookController.getBooks); 
router.get('/:id', bookController.getBookById); 
// Admin Routes
router.post('/', protect, adminOnly, bookController.createBook); 
router.put('/:id', protect, adminOnly, bookController.updateBook); 
router.delete('/:id', protect, adminOnly, bookController.deleteBook);

module.exports = router;

