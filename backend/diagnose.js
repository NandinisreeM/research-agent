require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function diagnose() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("No API Key found in .env");
        return;
    }

    const genAI = new GoogleGenerativeAI(key);

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();

        if (data.error) {
            console.error("Google API Error:", data.error.message);
            return;
        }

        console.log("Connection Successful!");
        console.log("Your key has access to these models:");
        data.models.forEach(m => {
            console.log(`- ${m.name.replace('models/', '')} (Supports: ${m.supportedGenerationMethods})`);
        });

    } catch (err) {
        console.error("Network Error:", err.message);
    }
}

diagnose();