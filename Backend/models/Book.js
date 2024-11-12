// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true},
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  discount: { type: Number, default: 0 }, 
  isBestSeller: { type: Boolean, default: false },
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
