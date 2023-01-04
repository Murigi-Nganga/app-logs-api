const asyncHandler = require("express-async-handler")
const LogModel = require("../models/LogModel")
const logNotFoundMsg = {message: 'Log not found'}

// @desc Get Logs
// @route GET /api/logs
const getLogs = asyncHandler(async (req, res) => {
  const logs = await LogModel.find()

  res.status(200).json({
    message: 'All logs retrieved successfully',
    data: logs
  })

})

// @desc Get Single Log
// @route GET /api/logs/:id
const getSingleLog = asyncHandler(async (req, res) => {
    try {
      const log = await LogModel.findById(req.params.id)

      if(log) {
        res.status(200).json({
          message: 'Log retrieved successfully',
          data: log
        })
      } else {
        res.status(404).json(logNotFoundMsg)
      }

    } catch(_) {
      res.status(404).json(logNotFoundMsg)
    }

})

// @desc Create Log
// @route POST /api/logs
const createLog = asyncHandler(async (req, res) => {
  try {
    const log = await LogModel.create({
      typeOfLog: req.body.typeOfLog,
      microservice: req.body.microservice,
      message: req.body.message,
      screen: req.body.screen,
      os: req.body.os
    })
  
    res.status(200).json({
      message: 'Log created successfully',
      data : log
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }

})

// @desc Update Log
// @route PUT /api/logs/:id
const updateLog = asyncHandler(async (req, res) => {

    try {
      const updatedLog = await LogModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )

      if(updatedLog) {
        res.status(200).json({
          message: 'Log updated successfully',
          data : updatedLog
        })
      } else {
        res.status(404).json(logNotFoundMsg)
      }

    } catch(_) {
      res.status(404).json(logNotFoundMsg)
    }
    
})

// @desc Delete Log
// @route DELETE /api/logs/:id
// @access Private
const deleteLog = asyncHandler(async (req, res) => {
  
  try {
    const log = await LogModel.findById(req.params.id);

    if (log) {
      await LogModel.findByIdAndDelete(req.params.id)
      res.status(200).json({
        message: 'Log deleted successfully',
        id: req.params.id
      })
    } else {
      res.status(404).json(logNotFoundMsg)
    }
  } catch(_) {
    res.status(404).json(logNotFoundMsg)
  }
  
})

module.exports = {
  getLogs: getLogs,
  getSingleLog: getSingleLog,
  createLog: createLog,
  updateLog: updateLog,
  deleteLog: deleteLog,
}