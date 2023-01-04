const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const { connectDB } = require('./config/db')
const { apiRouter } = require('./routes/LogRoutes')

const port = process.env.PORT || 4000

connectDB()

mongoose.set('strictQuery', false);

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})