import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

import app from "./src/app.js"
import {connectDB} from "./src/config/db.js"

connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`TASKORA backend running on port http://localhost:${PORT}`)
})