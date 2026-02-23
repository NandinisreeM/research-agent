const { performResearch } = require("../services/llmService");

exports.researchCompany = async (req, res) => {
  try {
    const { company } = req.body;

    if (!company) {
      return res.status(400).json({ error: "Company name is required" });
    }

    const data = await performResearch(company);
    res.status(200).json(data);
  } catch (error) {
    console.error("Agent Error:", error);
    res.status(500).json({ error: "Failed to research company. Ensure API keys are valid." });
  }
};