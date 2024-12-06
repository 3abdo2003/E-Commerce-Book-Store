// backend/services/bookService.js
const Book = require('../models/Book');

class BookService {
  static async createBook(data) {
    return Book.create(data);
  }

  static async getBooks(filter = {}) {
    return Book.find(filter).populate('category');
  }  

  static async getBookById(bookId) {
    return Book.findById(bookId);
  }

  static async updateBook(bookId, data) {
    return Book.findByIdAndUpdate(bookId, data, { new: true });
  }

  static async deleteBook(bookId) {
    return Book.findByIdAndDelete(bookId);
  }
}

module.exports = BookService;
