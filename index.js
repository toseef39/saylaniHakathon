const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

// Routes
const routes = require("./src/routes/bookroutes.js");
app.use("/books", routes);

const users = require("./src/routes/users.js");
app.use("/users", users);

// MongoDB Connection
mongoose.connect("mongodb+srv://toseefkalwar2001:ClIGQnJ6Wp50Z8Ig@cluster0.yxufha3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

}).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

// Server
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});
