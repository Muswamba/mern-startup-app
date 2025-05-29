const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const router = express.Router();

// IN momery store reset token
const resetTokens = new Map();

// Base Frontend URL
const baseURL = process.env.FRONTEND_URL || "http://localhost:5173";

// Register route
router.post("/register", async (req, res) => {
   const { name, email, password } = req.body;

   try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: "User already exists" });
      }
      const user = new User({ name, email, password });
      //   sign token immediately after registration
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
         expiresIn: "1d",
      });

      await user.save();

      res.status(201).json({
         message: "User registered successfully",
         token,
         user: { id: user._id, name: user.name, email: user.email },
      });
   } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
   }
});
// Login route
router.post("/login", async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(401).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
         expiresIn: "1d",
      });
      res.status(200).json({
         message: "Login successful",
         token,
         user: { id: user._id, name: user.name, email: user.email },
      });
   } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
   }
});

//Forgot password route
router.post("/forgot-password", async (req, res) => {
   const { email } = req.body;

   try {
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      // Store the reset token in memory
      resetTokens.set(resetToken, user._id);

      // Send email with reset link
      const resetLink = `${baseURL}/reset-password/${resetToken}`;
      // Here you would call your sendMail function to send the email
      const html = `<p>Click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`;
      await sendMail(user.email, "Password Reset", html);

      res.status(200).json({
         message: "Password reset link sent to your email",
         resetLink,
      });
   } catch (error) {
      console.error("Error in forgot password:", error);
      res.status(500).json({ message: "Internal server error" });
   }
});
// Reset password route
router.post("/reset-password/:token", async (req, res) => {
   const { token } = req.params;
   const { password } = req.body;

   try {
      const userId = resetTokens.get(token);
      if (!userId) {
         return res.status(400).json({ message: "Invalid or expired token" });
      }
      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      user.password = password;
      await user.save();
      resetTokens.delete(token);
      res.status(200).json({ message: "Password reset successful" });
   } catch (error) {
      console.error("Error in reset password:", error);
      res.status(500).json({ message: "Internal server error" });
   }
});

module.exports = router;
