const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    userName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    Image: { type: String, },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
