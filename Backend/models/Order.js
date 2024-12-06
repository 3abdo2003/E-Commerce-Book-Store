// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true,},
  items: [{book: {type: mongoose.Schema.Types.ObjectId,ref: 'Book',required: true,},quantity: {type: Number,required: true,},},],
  totalPrice: {type: Number,required: true,},
  shippingAddress: {type: String,required: true,},
  phoneNumber: {type: String,required: true,},
  paymentMethod: {type: String,
    enum: ['visa', 'cash'],
    required: true,},
    
  status: {type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
});

module.exports = mongoose.model('Order', orderSchema);