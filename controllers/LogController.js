const asyncHandler = require("express-async-handler")
const LogModel = require("../models/LogModel")
const { mongoose } = require("mongoose")
const logNotFoundMsg = { message: 'Log not found. Invalid log ID' }


// @desc Get All 'unhandled' logs
// @route GET /api/logs
const getAllLogs = asyncHandler(async (req, res) => {
  const logs = await LogModel.find({ 
    status: 'New',
    developer: null
  })

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

    if (log) {
      res.status(200).json({
      message: 'Log created successfully',
      data : log
    })
    } else {
      res.status(500).json({
        message: 'Log could not be created. Internal server error'
      })
    }
    
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
        {
          status: req.body.status,
          developer: req.dev.id
        },
        { 
          new: true,
          runValidators: true
        }
      )

      if(updatedLog) {
        res.status(200).json({
          message: 'Log updated successfully',
          data : updatedLog
        })
      } else {
        res.status(404).json(logNotFoundMsg)
      }

    } catch(error) {
        if (error instanceof mongoose.CastError) {
          res.status(400).json({'message': logNotFoundMsg})
        } else {
           // error instanceof mongoose.ValidationError
          res.status(400).json({'message': error.message})
        }
    }
})

// @desc Delete Log
// @route DELETE /api/logs/:id
// @access Private
// const deleteLog = asyncHandler(async (req, res) => {
  
//   try {
//     const log = await LogModel.findById(req.params.id);

//     if (log) {
//       await LogModel.findByIdAndDelete(req.params.id)
//       res.status(200).json({
//         message: 'Log deleted successfully',
//         id: req.params.id
//       })
//     } else {
//       res.status(404).json(logNotFoundMsg)
//     }
//   } catch(_) {
//     res.status(404).json(logNotFoundMsg)
//   }
  
// })

module.exports = {
  getAllLogs: getAllLogs,
  getSingleLog: getSingleLog,
  createLog: createLog,
  updateLog: updateLog,
  // deleteLog: deleteLog,
}