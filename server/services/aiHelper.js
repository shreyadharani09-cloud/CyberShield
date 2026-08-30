function generateSummary(title, description = "") {

    const text = description || title;

    if (text.toLowerCase().includes("ransomware")) {
        return "A ransomware campaign has been detected. Systems may be encrypted, causing loss of access to important files.";
    }

    if (text.toLowerCase().includes("phishing")) {
        return "A phishing attack is targeting users to steal passwords or sensitive information through deceptive emails or websites.";
    }

    if (text.toLowerCase().includes("malware")) {
        return "Malware has been identified that may infect systems, steal information, or disrupt normal operations.";
    }

    if (text.toLowerCase().includes("vulnerability")) {
        return "A software vulnerability has been discovered. Applying the latest security updates is recommended.";
    }

    return description || title;
}

function generatePrecautions(title, description = "") {

    const text = (title + " " + description).toLowerCase();

    if (text.includes("ransomware")) {
        return [
            "Back up important files regularly.",
            "Avoid opening suspicious attachments.",
            "Keep antivirus software updated."
        ];
    }

    if (text.includes("phishing")) {
        return [
            "Do not click unknown links.",
            "Verify the sender before sharing information.",
            "Enable Multi-Factor Authentication (MFA)."
        ];
    }

    if (text.includes("malware")) {
        return [
            "Scan your system with antivirus software.",
            "Download software only from trusted sources.",
            "Keep your operating system updated."
        ];
    }

    return [
        "Keep all software updated.",
        "Use strong passwords.",
        "Enable Multi-Factor Authentication."
    ];
}

module.exports = {
    generateSummary,
    generatePrecautions
};