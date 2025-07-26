import cors from 'cors';
import express from 'express';
const app = express();

app.use(express.json())
app.use(cors())

import geminiRoute from './Routes/gemini.js'
app.use('/gemini', geminiRoute)

app.get('/', (req, res) => {
  res.send('Welcome to the API')
})

export default app