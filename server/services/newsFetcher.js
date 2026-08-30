const Parser = require("rss-parser");
const News = require("../models/News");
const User = require("../models/User");
const sendCyberAlert = require("./emailService");

const {
    generateSummary,
    generatePrecautions
} = require("./aiHelper");

const parser = new Parser();
function getSeverity(title = "", description = "") {

    const text = (title + " " + description).toLowerCase();

    if (
        text.includes("ransomware") ||
        text.includes("zero-day") ||
        text.includes("breach") ||
        text.includes("exploited")
    ) {
        return "Critical";
    }

    if (
        text.includes("malware") ||
        text.includes("phishing") ||
        text.includes("vulnerability") ||
        text.includes("trojan")
    ) {
        return "High";
    }

    if (
        text.includes("attack") ||
        text.includes("hacker") ||
        text.includes("security flaw")
    ) {
        return "Medium";
    }

    return "Low";
}
const fetchCyberNews = async () => {
    try {

        const feed = await parser.parseURL(
            "https://feeds.feedburner.com/TheHackersNews"
        );

        for (let item of feed.items) {

           const existingNews = await News.findOne({
           link: item.link
});

            if (!existingNews) {
const news = new News({
    title: item.title,
    description: item.contentSnippet,
    source: feed.title,
    link: item.link,

    severity: getSeverity(item.title, item.contentSnippet),
    category: getCategory(item.title, item.contentSnippet),

   
    publishedAt: item.pubDate
});            await news.save();
const users = await User.find();

for (const user of users) {
    await sendCyberAlert(user.email, news);
}
            }
        }

        console.log("Cyber news updated successfully");

    } catch (error) {
        console.log(error.message);
    }
};
function getCategory(title = "", description = "") {

    const text = (title + " " + description).toLowerCase();

    if (text.includes("ransomware")) {
        return "Ransomware";
    }

    if (
        text.includes("phishing") ||
        text.includes("credential") ||
        text.includes("email scam")
    ) {
        return "Phishing";
    }

    if (
        text.includes("malware") ||
        text.includes("trojan") ||
        text.includes("virus") ||
        text.includes("worm") ||
        text.includes("spyware") ||
        text.includes("botnet")
    ) {
        return "Malware";
    }

    if (
        text.includes("vulnerability") ||
        text.includes("cve") ||
        text.includes("exploit") ||
        text.includes("patch") ||
        text.includes("zero-day") ||
        text.includes("zero day")
    ) {
        return "Vulnerability";
    }

    return "General";
} 
module.exports = fetchCyberNews;