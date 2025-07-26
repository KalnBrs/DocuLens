import app from './app.js'
import { config } from 'dotenv'
config()

app.listen(8080, () => {})