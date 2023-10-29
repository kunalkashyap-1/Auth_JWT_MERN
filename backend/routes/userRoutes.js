const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const generateToken = require("../configs/genToken");

// Define a route for user login
router.route("/login").post(async (req, res) => {
  const { email, pswd } = req.body; // Extract email and password

  const userExists = await User.findOne({ email }); // Check if user exists

  if (!userExists) {
    // Return a 400 status if user doesn't exist
    res.status(400).json({ message: "User doesn't exist" });
  } else {
    // Check if password is valid
    const isPasswordValid = await userExists.matchPassword(pswd);

    if (isPasswordValid) {
      res.status(200).json({
        // Return user details and a token on success
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        token: generateToken(userExists._id),
      });
    } else {
      // Return a 401 status on invalid password
      res.status(401).json({ message: "Invalid password" });
    }
  }
});

module.exports = router;
