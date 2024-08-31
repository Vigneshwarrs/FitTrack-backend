const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/emailService");

module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const tokens = crypto.randomBytes(32).toString("hex");
    const authToken = crypto.createHash("sha256").update(tokens).digest("hex");
    const newUser = new User({ name, email, password, authToken });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Registration Successful",
      text: `Thank you for registering with us!. Please click on the link below to verify your email address. \n\n ${process.env.BASE_URL}/verify/${authToken}`,
    };
    sendEmail(mailOptions);
    res.status(201).json({token,user: newUser, message: "User registered successfully" });
  } catch (err) {
    console.log("Register Error", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.activateUser = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ authToken: token });
        if (!user) return res.status(400).json({ message: "Invalid token" });
        user.isVerified = true;
        user.authToken = null;
        await user.save();
        res.status(200).json({ message: "User activated successfully" });
    } catch (err) {
        console.log("Activate Error", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(400).json({ message: "User Not Found" });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Password is incorrect" });
        if (!user.isVerified) return res.status(400).json({ message: "User is not verified" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token, user, message: "User logged in successfully" });
    } catch (err) {
        console.log("Login Error", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User Not Found" });
        const token = crypto.randomBytes(20).toString("hex");
        user.resetToken = token;
        await user.save();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset",
            text: `Click on the link below to reset your password. \n\n ${process.env.BASE_URL}/reset-password/${token}`,
        };
        sendEmail(mailOptions);
    }catch(err) {
        console.log("Forgot Password Error", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({ resetToken: token });
        if (!user) return res.status(400).json({ message: "Invalid token" });
        user.password = password;
        user.resetToken = null;
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        console.log("Reset Password Error", err);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports.getUser = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id);
        if (!user) return res.status(400).json({ message: "User Not Found" });
        res.status(200).json({ user });
        console.log(req.user);
    } catch (err) {
        console.log("Get User Error", err);
        res.status(500).json({ message: "Server error" });
    }
};  