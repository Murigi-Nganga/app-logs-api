const express = require("express")
const { getSingleLog, getAllLogs, createLog, updateLog } = require("../controllers/LogController")
const router = express.Router()
const { protect } = require('../middleware/AuthMiddleware')

router.get("/", protect, getAllLogs)

router.post("/", createLog)

router.get("/:id", protect, getSingleLog)

router.put("/:id", protect, updateLog)

// router.delete("/:id", protect, deleteLog)

module.exports = { logsRouter: router }