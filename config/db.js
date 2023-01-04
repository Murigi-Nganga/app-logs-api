const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB successfully!")
    } catch (error) {
        console.log(`Could not connect to MongoDB \n${error}`)
        process.exit(1)
    }
}

module.exports = { connectDB }