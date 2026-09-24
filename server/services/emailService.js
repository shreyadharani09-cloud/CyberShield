const nodemailer = require("nodemailer");

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendCyberAlert = async (userEmail, news) => {
    try {

        const formattedDate = news.publishedAt
            ? new Date(news.publishedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })
            : "Date not available";

        const mailOptions = {
            from: `"CyberShield" <${process.env.EMAIL_USER}>`,

            to: userEmail,

            subject: `🚨 CyberShield Alert: ${news.title}`,

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 650px;
                    margin: auto;
                    padding: 25px;
                    background-color: #f5f7fa;
                ">

                    <div style="
                        background-color: #111827;
                        color: white;
                        padding: 20px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <h1 style="margin: 0;">
                            🛡️ CyberShield
                        </h1>

                        <p style="margin-bottom: 0;">
                            Cybersecurity Alert
                        </p>
                    </div>

                    <div style="
                        background-color: white;
                        padding: 25px;
                        margin-top: 15px;
                        border-radius: 10px;
                    ">

                        <h2 style="color: #111827;">
                            ${news.title}
                        </h2>

                        <p>
                            📅 <strong>Date:</strong> ${formattedDate}
                        </p>

                        <p>
                            ⚠️ <strong>Severity:</strong>
                            ${news.severity || "Unknown"}
                        </p>

                        <hr>

                        <h3>
                            Incident Happened
                        </h3>

                        <p>
                            ${news.description || "No description available."}
                        </p>

                        <div style="text-align: center; margin-top: 30px;">

                            <a
                              href="https://cybershield-client.onrender.com/news/${news._id}"
                                style="
                                    display: inline-block;
                                    padding: 13px 25px;
                                    background-color: #2563eb;
                                    color: white;
                                    text-decoration: none;
                                    border-radius: 6px;
                                    font-weight: bold;
                                "
                            >
                                Read Full Alert →
                            </a>

                        </div>

                        <p style="
                            margin-top: 30px;
                            font-size: 12px;
                            color: #777;
                        ">
                            You are receiving this email because you
                            subscribed to CyberShield cybersecurity alerts.
                        </p>

                    </div>

                    <p style="
                        text-align: center;
                        color: #777;
                        font-size: 12px;
                        margin-top: 15px;
                    ">
                        © CyberShield
                    </p>

                </div>
            `
        };

        await resend.emails.send(mailOptions);

        console.log(`Cyber alert sent to ${userEmail}`);

    } catch (error) {

        console.error(
            `Failed to send alert to ${userEmail}:`,
            error.message
        );

        throw error;
    }
};

module.exports = sendCyberAlert;