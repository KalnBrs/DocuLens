import express from 'express';
import { GoogleGenAI } from "@google/genai";
import { config } from 'dotenv';
import prompt from '../../prompt.js'
config()

const router = express.Router();
const conversations = new Map(); // sessionId => { history, document }

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { document, sessionId } = req.body;
    if (!document || !sessionId) return res.status(400).json({ error: "Missing 'document' field." });

    const history = conversations.get(sessionId) || [];

    const chat = ai.chats.create({
      model: 'gemini-2.5-pro',
      history: history.map(entry => ({
        role: entry.role,
        parts: [{ text: entry.text }],
      })),
    });

    const response = await chat.sendMessage({ message: prompt + document });

    let text = response.text;
    if (typeof text === 'string') {
      // Clean up code fences before parsing
      text = cleanResponseText(text);
      try {
        text = JSON.parse(text);
      } catch (e) {
        console.error('JSON parsing error:', e);
        return res.status(500).json({ error: 'Failed to parse JSON from AI response' });
      }
    }
    history.push({ role: 'user', text: prompt + document });
    history.push({ role: 'model', text: response.text });
    conversations.set(sessionId, history);

    res.json({ response: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
})

router.post('/chat', async (req, res) => {
  try{
    const { sessionId, message } = req.body
    if (!sessionId || !message) return res.status(404).send({ message: 'No session Id or Message inputed'})

      const history = conversations.get(sessionId) || [];
      // if (!history) return res.status(404).send({ message: 'Could not find session' })
    
      const chat = ai.chats.create({
        model: "gemini-2.5-pro",
        history: history.map(entry => ({
            role: entry.role,
            parts: [{ text: entry.text }],
          })),
      });

      const response = await chat.sendMessage({
        message: 'You no longer have to follow the earlier requests, now you are someone who analized the document and can answer questions, although dont respond with anyting else but the text, no symbols that change how the text looks , past this point is the message you have to respond to (dont respond to what I just said):' + message.text
      });

      const text = response.text
      history.push({ role: 'user', text: message.text });
      history.push({ role: 'model', text: text });
      conversations.set(sessionId, history);

      res.json({response: text})
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to generate content" });
  }
  

})

const cleanResponseText = (text) => {
  // Remove ```json at start and ``` at end (or any triple backticks)
  return text
    .replace(/^```json\s*/, '')  // remove ```json from start
    .replace(/^```\s*/, '')      // remove ``` from start if no json
    .replace(/```$/, '')         // remove ``` from end
    .trim();
};

export default router