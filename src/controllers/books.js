const bookSchema = require("../models/bookmodel.js");

// Add a new book
const addBook = async (req, res) => {
    const { name, author, price } = req.body;
    if (!name || !author || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const userId = req.user.userId
    const user = await userSchema.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const image = req.file ? req.file.filename : null;

    try {
        const newBook = new bookSchema({
            userName: userId,
            name,
            author,
            price,
            Image: image
        });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get my books

const getMyBooks = async (req, res) => {
    try {
        const books = await bookSchema.find({ User: req.user._id });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Update a book
const updateBook = async (req, res) => {
    const { name, author, price } = req.body;
    if (!name || !author || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const image = req.file ? req.file.filename : null;
    console.log(image);
    console.log(req.file);

    try {
        const book = await bookSchema.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        book.name = name;
        book.author = author;
        book.price = price;
        if (image) {
            book.Image = image;
        }
        await book.save();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const book = await bookSchema.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await bookSchema.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single book
const getBook = async (req, res) => {
    try {
        const book = await bookSchema.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addBook, updateBook, deleteBook, getBooks, getBook, getMyBooks };
