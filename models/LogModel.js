const mongoose = require('mongoose')

const logSchema = mongoose.Schema({
    typeOfLog: {
        type: String,
        required: [true, 'Please add a type of log'],
        enum: ['Info', 'Debug', 'Error', 'Fatal']
    },
    microservice: {
        type: String,
        required: [true, 'Please add a microservice']
    },
    message: {
        type: String,
        required: [true, 'Please add a log message']
    },
    screen: {
        type: String,
        required: [true, 'Please add the screen where the log occurred']
    },
    os: {
        type: String,
        required: [true, 'Please add the os that generated the log'],
        enum: ['Android', 'iOS']
    },
    status: {
        type: String,
        required: [true, 'Please add a log status'],
        enum: ['New', 'In Progress', 'Solved'],
        default: 'New'
    },
}, {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
})

module.exports = mongoose.model('Log', logSchema)