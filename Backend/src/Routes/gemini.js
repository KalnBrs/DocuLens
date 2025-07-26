import express from 'express';
import { GoogleGenAI } from "@google/genai";
import { config } from 'dotenv';
import prompt from '../../prompt.js'
config()

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { document } = req.body;
    if (!document) return res.status(400).json({ error: "Missing 'document' field." });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt + document,
    });
    const text = extractJSON(response.text);
    console.log(response)

    res.json({ response: text, test: response });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
})

const extractJSON = (responseText) => {
  const jsonStart = responseText.indexOf('{');
  const jsonEnd = responseText.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) throw new Error("JSON not found in response");

  const jsonString = responseText.slice(jsonStart, jsonEnd + 1);
  return JSON.parse(jsonString);
};

export default router