// backend/middleware/authMiddleware
const jwt = require('jsonwebtoken');
const Users = require('../models/Users'); // Correct model name

// Middleware to protect routes for authenticated users
const protect = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get the token from header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user to the request object
    req.user = await Users.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to allow only admin users to access certain routes
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden: Admins only' });
  }
};

// Middleware to allow only customer users to access certain routes
const customerOnly = (req, res, next) => {
  if (req.user && req.user.role === 'customer') {
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden: Customers only' });
  }
};

module.exports = { protect, adminOnly, customerOnly };
