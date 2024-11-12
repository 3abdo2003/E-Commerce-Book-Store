// backend/controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserService = require('../services/userService');

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error("JWT_SECRET is missing in environment variables");
}

exports.registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const savedUser = await UserService.registerUser({ name, email, password });
      // Generate JWT token
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      // Save the token to the user record
      savedUser.token = token;
      await savedUser.save();
      // Return the saved user with the generated token
      res.status(201).json({ ...savedUser.toObject(), token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.loginUser(email, password);
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      // Save the token to the user record
      user.token = token;
      await user.save();
      // Return the user and token
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.getUserProfile = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await UserService.updateUserProfile(req.user._id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserService.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
