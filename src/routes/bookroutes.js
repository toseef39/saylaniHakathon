const express = require("express");
const Router = express.Router();
const { getBooks, getBook, addBook, updateBook, deleteBook, getMyBooks } = require("../controllers/books");
const upload = require("../middleware/multer.js");
const authenticateToken = require("../middleware/authenticateToken");

Router.get("/getbooks", getBooks);
Router.get("/getmybooks", authenticateToken, getMyBooks);
Router.get("/getbooks/:id", getBook);
Router.post("/addbooks", upload.single('image'), addBook);
Router.put("/updatebooks/:id", upload.single('image'), updateBook);
Router.delete("/deletebooks/:id", deleteBook);

module.exports = Router;
