
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const fetchCyberNews = require("./services/newsFetcher");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");
const testEmailRoutes = require("./routes/testEmailRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/test-email", testEmailRoutes);

// Routes
app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("MongoDB Connected");

    // Fetch news immediately when server starts
    await fetchCyberNews();

    // Automatically check for new news every 10 minutes
    setInterval(async () => {

        console.log("Checking for new cyber news...");

        await fetchCyberNews();

    }, 10 * 60 * 1000);

})
.catch((error) => {
    console.log(error);
});

// Home Route
app.get("/", (req, res) => {
    res.send("CyberShield Backend Running");
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

