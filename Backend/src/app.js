import cors from 'cors';
import express from 'express';
const app = express();

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5174', // frontend URL
  methods: ['GET', 'POST'],
  credentials: true, // if using cookies/sessions
}))

import geminiRoute from './Routes/gemini.js'
app.use('/gemini', geminiRoute)

app.get('/', (req, res) => {
  res.send('Welcome to the API')
})

export default app