
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create user
        const user = new User({
            name,
            email,
            emailAlerts: false
        });

        await user.save();

        res.status(201).json({
            message: "Registered successfully! Please login to receive CyberShield alerts."
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
});


// LOGIN USER
router.post("/login", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        // Find registered user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found. Please register first."
            });
        }

        // Enable email alerts after login
        user.emailAlerts = true;

        await user.save();

        // Create login token
        const secret = process.env.JWT_SECRET || "mysecretkey";

        const token = jwt.sign(
            { id: user._id },
            secret,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful! CyberShield alerts are now enabled.",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                emailAlerts: user.emailAlerts
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
});


// LOGOUT USER
router.post("/logout", async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Disable email alerts after logout
        user.emailAlerts = false;

        await user.save();

        res.status(200).json({
            message: "Logged out successfully. Email alerts disabled."
        });

    } catch (error) {
        console.error("LOGOUT ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;

