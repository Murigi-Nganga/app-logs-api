const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const { connectDB } = require('./config/db')
const { logsRouter } = require('./routes/LogRoutes')
const { devsRouter } = require('./routes/DevRoutes')

const port = process.env.PORT || 4000

connectDB()

mongoose.set('strictQuery', false);

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/logs', logsRouter)
app.use('/api/devs', devsRouter)

app.use('*', (req, res)=> {  //For all other unspecified routes
  res.status(404).json({
    message: 'Invalid route'
  })
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})