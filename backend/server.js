require('dotenv').config();
const cors = require("cors");
const express = require("express");
const { researchCompany } = require("./src/controllers/agentController");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ 
        status: "ok", 
        keyLoaded: !!process.env.GEMINI_API_KEY,
        provider: process.env.LLM_PROVIDER 
    });
});

app.post("/agent/research", researchCompany);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Agent active on port ${PORT}`));