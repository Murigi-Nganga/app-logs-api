const asyncHandler = require("express-async-handler");
const LogModel = require("../models/LogModel");
const { mongoose } = require("mongoose");

// An aggregation to get the statistics for all types of logs
const getTypeStats = asyncHandler(async (req, res) => {
  try {
    var nums = await LogModel.count();

    const typeStats = await LogModel.aggregate([
      {
        $group: {
          _id: "$typeOfLog",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          typeOfLog: "$_id",
          count: 1,
          percentage: {
            $multiply: [{ $divide: ["$count", nums] }, 100],
          },
        },
      },
    ]);

    res.status(200).json(typeStats);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

const getStatusStats = asyncHandler(async (req, res) => {
  try {
    var nums = await LogModel.count();

    const typeStats = await LogModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
          percentage: {
            $multiply: [{ $divide: ["$count", nums] }, 100],
          },
        },
      },
    ]);

    res.status(200).json(typeStats);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

const getMicroStats = asyncHandler(async (req, res) => {
  try {
    var nums = await LogModel.count();

    const typeStats = await LogModel.aggregate([
      {
        $group: {
          _id: "$microservice",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          microservice: "$_id",
          count: 1,
          percentage: {
            $multiply: [{ $divide: ["$count", nums] }, 100],
          },
        },
      },
    ]);

    res.status(200).json(typeStats);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = {
  getTypeStats: getTypeStats,
  getStatusStats: getStatusStats,
  getMicroStats: getMicroStats,
};
