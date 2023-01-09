const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_DEVELOPMENT)
        console.log("Connected to MongoDB successfully!")
    } catch (error) {
        console.log(`Could not connect to MongoDB \n${error}`)
        process.exit(1)
    }
}

module.exports = { connectDB }
