import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'

import authRoutes from './routes/auth.routes'
import resumeRoutes from './routes/resume.routes'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Serve frontend
app.use(express.static(path.join(__dirname, 'client-dist')))
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'client-dist', 'index.html'))
})

app.use('/api/auth', authRoutes)
app.use('/api/resume', resumeRoutes)

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Mongo Error: ', err))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
