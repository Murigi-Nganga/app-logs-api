const express = require("express")
const { getTypeStats, getStatusStats, getMicroStats } = require("../controllers/StatsController")
const router = express.Router()
const { protect } = require('../middleware/AuthMiddleware')

router.get("/type", protect, getTypeStats)

router.get("/status", protect, getStatusStats)

router.get("/microservice", protect, getMicroStats)

module.exports = { statsRouter: router }