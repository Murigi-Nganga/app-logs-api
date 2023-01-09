const mongoose = require('mongoose')
const { sendEmail } = require('../middleware/EmailMiddleware')

const logSchema = mongoose.Schema({
    typeOfLog: {
        type: String,
        required: [true, 'Please add a type of log'],
        enum: ['Info', 'Debug', 'Error', 'Fatal'],
    },
    microservice: {
        type: String,
        required: [true, 'Please add a microservice'],
    },
    message: {
        type: String,
        required: [true, 'Please add a log message'],
    },
    screen: {
        type: String,
        required: [true, 'Please add the screen where the log occurred'],
    },
    os: {
        type: String,
        required: [true, 'Please add the os that generated the log'],
        enum: ['Android', 'iOS'],
    },
    status: {
        type: String,
        required: [true, 'Please add a log status'],
        enum: ['New', 'In Progress', 'Solved'],
        default: 'New'
    },
    developer: {      
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Developer',
        default: null
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
})

logSchema.post('save', async function (doc) {
    // Send emails if the type of log is 'Fatal'
    if (this.typeOfLog === 'Fatal') {
       await sendEmail(this);
    }
})

module.exports = mongoose.model('Log', logSchema)