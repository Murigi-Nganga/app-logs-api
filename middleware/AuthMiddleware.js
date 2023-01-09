const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const DevModel = require('../models/DevModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user (dev) from token
            req.dev = await DevModel.findById(decoded.id).select('-passoword')

            next()
        } catch (error) {
            res.status(401).json({message: error.message})
        }
    }

    if(!token) {
        res.status(401).json({message: 'Not Authorized'})
    }
})

module.exports = {
    protect: protect
}