const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Display all books or search results
router.get('/', async (req, res) => {
    const searchQuery = req.query.search || '';
    try {
        const books = await Book.find({
            $or: [
                { title: new RegExp(searchQuery, 'i') },
                { author: new RegExp(searchQuery, 'i') }
            ]
        });
        res.render('index', { books, searchQuery });
    } catch (err) {
        res.status(500).send("Error fetching books: " + err);
    }
});

// Add a new book
router.post('/add', async (req, res) => {
    const { title, author, genre } = req.body;
    try {
        const newBook = new Book({ title, author, genre });
        await newBook.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error adding book: " + err);
    }
});

module.exports = router;
