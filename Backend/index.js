const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const AuthRoute = require('./routes/Authentication.route.js')
const JobPostingRoute = require('./routes/JobPosting.route.js')
const homePageRoute = require('./routes/HeroSection.route.js')
const blogPostingRoute = require('./routes/BlogPosting.route.js')

const connectToMongoDB = require('./db/db.js')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true
  })
)

app.use('/api/auth', AuthRoute)
app.use('/api/job-posting', JobPostingRoute)
app.use('/api/blog-posting', blogPostingRoute)
app.use('/api/home-page', homePageRoute)

app.get('/', (req, res) => {
  res.send('Welcome to the API!')
})

// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' })
// })

const PORT = process.env.PORT || 8000

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT || 8000}`)
  connectToMongoDB()
})
