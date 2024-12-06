// backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();
// Public Routes
router.post('/register', userController.registerUser);   
router.post('/login', userController.loginUser);     
// Protected Routes (Customer)
router.get('/profile', protect, userController.getUserProfile);  
router.put('/profile', protect, userController.updateUserProfile); 
// Admin Routes (Protected)
router.get('/', protect, adminOnly, userController.getUsers);      
router.delete('/:id', protect, adminOnly, userController.deleteUser); 

module.exports = router;

