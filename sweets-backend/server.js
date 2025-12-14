import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import sweetRoutes from './routes/sweets.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from public folder
app.use('/images', express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/sweets', sweetRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

app.get('/', (req, res) => {
  res.send('Sweet Store Backend is running 🚀');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sweets-store')
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error)
    // Start server anyway for development (you can use in-memory data)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (without database)`)
      console.log('⚠️  Note: MongoDB connection failed. Some features may not work.')
    })
  })

export default app


