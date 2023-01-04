const express = require("express")
const { getSingleLog, getLogs, createLog, updateLog, deleteLog } = require("../controllers/LogController")
const router = express.Router()

router.get("/", getLogs)

router.post("/", createLog)

router.get("/:id", getSingleLog)

router.put("/:id", updateLog)

router.delete("/:id", deleteLog)

module.exports = { apiRouter: router }