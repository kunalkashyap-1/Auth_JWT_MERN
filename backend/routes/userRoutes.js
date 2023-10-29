const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const generateToken = require("../configs/genToken");
const User = require("../models/userModel");
const story = require("../configs/story");

// Define a route for user login
router.route("/login").post(async (req, res) => {
  const { email, pswd } = req.body; // Extract email and password from request body

  const userExists = await User.findOne({ email }); // Check if user exists in the database

  if (!userExists) {
    // If user doesn't exist, return a 400 status with an error message
    res.status(400).json({ message: "User doesn't exist" });
  } else {
    // If user exists, check if the provided password is valid
    const isPasswordValid = await userExists.matchPassword(pswd);

    if (isPasswordValid) {
      // If password is valid, return a 200 status with user details and a token
      res.status(200).json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        token: generateToken(userExists._id),
      });
    } else {
      // If password is invalid, return a 401 status with an error message
      res.status(401).json({ message: "Invalid password" });
    }
  }
});

// Define a route for user registration
router.route("/register").post(async (req, res) => {
  const { name, email, pswd } = req.body; // Extract name, email, and password from request body

  if (!name || !email || !pswd) {
    // If any field is missing, return a 400 status with an error message
    res.status(400).json({ message: "Please enter all the fields" });
  }

  const userExists = await User.findOne({ email }); // Check if user already exists in the database

  if (userExists) {
    // If user already exists, return a 400 status with an error message
    res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    pswd,
  });

  if (user) {
    // If user is created successfully, return a 201 status with user details and a token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // If failed to create the user, return a 400 status with an error message
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

// Define a route for sending protected data
router.route("/protected").get(protect, async (req, res) => {
  res.status(200).json({ story });
});

module.exports = router;
