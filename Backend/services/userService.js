const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/Users'); // Correct model path

exports.registerUser = async (userData) => {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('User already exists');
      }
  
      // Hash the user's password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
  
      // Create a new user with the hashed password
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      return await newUser.save();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  exports.loginUser = async (email, password) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
  
      // Generate a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Adjust expiration as needed
      });
  
      return { user, token }; // Return both user and token
    } catch (error) {
      throw new Error(error.message);
    }
  };

exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateUserProfile = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error('User not found');
    }
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
