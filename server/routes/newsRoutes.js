const express = require("express");
const router = express.Router();

const News = require("../models/News");
const User = require("../models/User");
const sendCyberAlert = require("../services/emailService");
const {
    generateSummary,
    generatePrecautions
} = require("../services/aiHelper");


// GET ALL NEWS
router.get("/", async (req, res) => {

    try {

        const news = await News.find()
            .sort({ publishedAt: -1 });

        res.json(news);

    } catch (error) {

        console.error("Get all news error:", error);

        res.status(500).json({
            message: error.message
        });

    }

});


// GET SINGLE NEWS + AI DETAILS
router.get("/:id", async (req, res) => {

    try {

        const news = await News.findById(req.params.id);

        if (!news) {

            return res.status(404).json({
                message: "News not found"
            });

        }


        // Generate AI summary
        const aiSummary = generateSummary(
            news.title,
            news.description
        );


        // Generate precautions
        const precautions = generatePrecautions(
            news.title,
            news.description
        );


        res.json({

            ...news.toObject(),

            aiSummary: aiSummary,

            precautions: Array.isArray(precautions)
                ? precautions.join("\n")
                : precautions

        });


    } catch (error) {

        console.error("Get single news error:", error);

        res.status(500).json({
            message: error.message
        });

    }

});


// POST NEW NEWS
// POST NEW NEWS + SEND EMAIL ALERTS
router.post("/", async (req, res) => {

    try {

        // Save news
        const newNews = new News(req.body);

        await newNews.save();

        console.log("News saved successfully");


        // Get all registered users
        const users = await User.find({}, "email");

        console.log(`Found ${users.length} registered users`);


        // Send email to every registered user
        for (const user of users) {

            try {

                await sendCyberAlert(
                    user.email,
                    newNews
                );

            } catch (emailError) {

                console.error(
                    `Could not send email to ${user.email}:`,
                    emailError.message
                );

            }

        }


        // Send response
        res.status(201).json({

            message: "News created and email alerts processed successfully",

            news: newNews,

            usersNotified: users.length

        });


    } catch (error) {

        console.error(
            "Create news error:",
            error
        );

        res.status(400).json({

            message: error.message

        });

    }

});
module.exports = router;