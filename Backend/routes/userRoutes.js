// backend/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, getUsers, deleteUser } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();
// Public Routes
router.post('/register', registerUser);   
router.post('/login', loginUser);     
// Protected Routes (Customer)
router.get('/profile', protect, getUserProfile);  
router.put('/profile', protect, updateUserProfile); 
// Admin Routes (Protected)
router.get('/', protect, adminOnly, getUsers);      
router.delete('/:id', protect, adminOnly, deleteUser); 

module.exports = router;

