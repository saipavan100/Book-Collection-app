const mongoose = require('mongoose');

// Create book schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true }
});

// Create and export Book model
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
    