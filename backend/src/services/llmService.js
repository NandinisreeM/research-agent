const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const getResearchFromGemini = async (company) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-flash-latest" 
  });

  const prompt = `
    Research the company: "${company}".
    Return ONLY a JSON object with: 
    company, industry, product_summary, target_customers (array), 
    gtm_insights (array), competitors (array), pricing_model.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (error) {
    if (error.message.includes("404") || error.message.includes("429")) {
        console.log("Switching to Pro model...");
        const proModel = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
        const result = await proModel.generateContent(prompt);
        return JSON.parse(result.response.text().replace(/```json|```/g, "").trim());
    }
    throw error;
  }
};

module.exports = { performResearch: getResearchFromGemini };