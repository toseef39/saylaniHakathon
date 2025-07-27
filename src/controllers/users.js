const userSchema = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../middleware/nodemailer');
const otpsModel = require('../models/otpsModel');

//generate otp
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

exports.Signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    console.log(req.body);

    try {
        const existingUser = await userSchema.findOne({ email });
        console.log(existingUser);

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("sadx", hashedPassword);

        const newUser = new userSchema({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//login
exports.Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Forget Password
exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email)
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });

        const user = await userSchema.findOne({ email: email });
        if (!user) {
            console.log('User not found:', email); // Log user not found
            return res.status(400).json({
                success: false,
                message: "Invalid Email",
            });
        }

        const otp = generateOTP();
        console.log('Generated OTP:', otp);

        // Check if OTP already sent
        let otpData = await otpsModel.findOne({ identify: email });
        if (otpData) {
            otpData.resetPasswordOTP = otp;
            otpData.resetPasswordExpires = Date.now() + 3600000;
            await otpData.save();
        } else {
            otpData = await otpsModel.create({
                identify: email,
                resetPasswordOTP: otp,
                resetPasswordExpires: Date.now() + 3600000
            });
        }


        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password OTP',
            text: `Your OTP is ${otp}`
        }, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to send OTP',
                });
            }
            console.log('Email sent:', info.response); // Log email sent response
        });

        return res.status(200).json({
            success: true,
            message: "OTP Sent", otp
        });
    } catch (error) {
        console.error('Error in forgetPassword function:', error); // Log general errors
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// verify forget password otp

exports.verifyForgetPasswordOtp = async (req, res) => {
    const { email, otp } = req.body;
        console.log(req.body)

    try {
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await userSchema.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email",
            });
        }

        const otpData = await otpsModel.findOne({ identify: email });
        if (!otpData) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        }

        if (otpData.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired",
            });
        }

        if (otpData.resetPasswordOTP !== otp) {
            return res.status(400).json({
                success: false,
                message: "OTP does not match",
            });

        }

        return res.status(200).json({
            success: true,
            message: "OTP Verified",
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

// Set new password

exports.setNewPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }



        const user = await userSchema.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email",
            });
        }
        console.log(user);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password Updated",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

exports.getUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const users = await userSchema.find(userId);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

// update profile firstName lastname 

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log(userId);

        const { firstName, lastName } = req.body;
        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const image = req.file ? req.file.filename : user.Image;
        user.Image = image;
        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}