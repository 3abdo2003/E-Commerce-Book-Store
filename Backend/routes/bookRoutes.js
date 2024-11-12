// backend/routes/bookRoutes.js
const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();
// Public Routes
router.get('/', getBooks); 
router.get('/:id', getBookById); 
// Admin Routes (Protected)
router.post('/', protect, adminOnly, createBook); 
router.put('/:id', protect, adminOnly, updateBook); 
router.delete('/:id', protect, adminOnly, deleteBook);

module.exports = router;

