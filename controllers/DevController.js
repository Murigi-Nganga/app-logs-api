const asyncHandler = require("express-async-handler");
const DevModel = require("../models/DevModel");
const LogModel = require("../models/LogModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT from id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// @desc    Register new dev
// @route   POST /api/devs/register
// access Public
const registerDev = asyncHandler(async (req, res) => {
  try {
    const dev = await DevModel.create(req.body);

    res.status(200).json({
      message: "Developer created successfully",
      data: {
        _id: dev.id,
        name: dev.name,
        email: dev.email,
        token: generateToken(dev.id),
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// @desc    Authenticate a developer
// @route   POST /api/devs/login
// access Public
const loginDev = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const dev = await DevModel.findOne({ email });

  if (dev && (await bcrypt.compare(password, dev.password))) {
    res.status(200).json({
      message: "Login successful",
      data: {
        _id: dev.id,
        name: dev.name,
        email: dev.email,
        token: generateToken(dev.id),
      },
    });
  } else {
    return res.status(404).json({
      message: "Invalid credentials",
    });
  }
});

// @desc    Get logs that belong to a developer
// @route   GET /api/devs/logs
// access Private
const getDevLogs = asyncHandler(async (req, res) => {
  const devLogs = await LogModel.find({ developer: req.dev.id }).populate(
    "developer",
    "name"
  );

  res.status(200).json({
    message: "Developer logs retrieved successfully",
    data: devLogs,
  });
});

// @desc    Get information about all developers
// @route   GET /api/devs/all
// access Private
const getAllDevs = asyncHandler(async (req, res) => {
  const devsData = await DevModel.find().select({
    id: 1,
    name: 1,
    role: 1,
    stack: 1,
    email: 1,
  });

  res.status(200).json({
    message: "Information about developers retrieved successfully",
    data: devsData,
  });
});

module.exports = {
  registerDev: registerDev,
  loginDev: loginDev,
  getDevLogs: getDevLogs,
  getAllDevs: getAllDevs,
};
