const express = require('express');
const cors = require('cors'); 
// Load environment variables from the default .env file
require('dotenv').config({ path: './backend/.env' });

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());  // Allow requests from any origin
app.use(express.json()); // For parsing JSON data

//Imports for routes
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

// Set up for routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
