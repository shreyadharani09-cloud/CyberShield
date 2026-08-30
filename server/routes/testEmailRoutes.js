const express = require("express");
const News = require("../models/News");
const sendCyberAlert = require("../services/emailService");

const router = express.Router();

router.post("/send-test", async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        // Get one real news article from MongoDB
        const news = await News.findOne().sort({
            publishedAt: -1
        });

        if (!news) {
            return res.status(404).json({
                message: "No news found in database"
            });
        }

        // Send the real news article
        await sendCyberAlert(email, news);

        res.json({
            message: "Test email sent successfully",
            newsId: news._id
        });

    } catch (error) {

        console.error("Test email error:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;