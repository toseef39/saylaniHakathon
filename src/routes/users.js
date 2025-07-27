const express = require("express");
const Router = express.Router();
const { Signup, Login, getUser, updateProfile, forgetPassword, setNewPassword, verifyForgetPasswordOtp } = require("../controllers/users");
const upload = require("../middleware/multer.js");
const authenticateToken = require("../middleware/authenticateToken");


Router.post("/signup", Signup);
Router.post("/login", Login);
Router.get("/getuser", authenticateToken, getUser);
Router.put("/forgetpassword", forgetPassword);
Router.put("/setnewpassword", setNewPassword);
Router.put("/verifyforgetpasswordotp", verifyForgetPasswordOtp);
Router.put("/updateprofile", authenticateToken, upload.single('image'), updateProfile);

module.exports = Router;
