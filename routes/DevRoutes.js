const express = require("express")
const router = express.Router()
const { registerDev, loginDev, getDevLogs, getAllDevs } = require('../controllers/DevController')

const { protect } = require('../middleware/AuthMiddleware')

router.post('/register', registerDev)
router.post('/login', loginDev)
router.get('/logs', protect, getDevLogs)
router.get('/all', protect, getAllDevs)

module.exports = { devsRouter: router }
