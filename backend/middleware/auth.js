const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

// Custom middleware for protecting routes
const protect = (req, res, next) => {
  // Extract the token from the Authorization header
  const token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

  if (!token) {
    res.status(401).send("Not authorized, no token");
    return;
  }

  try {
    // Verify the token and decode user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decoded.id)
      .select("-password")
      .then((user) => {
        if (!user) {
          res.status(401).send("Not authorized, user not found");
        } else {
          // Set the decoded user data in the request object
          req.user = user;
          next();
        }
      })
      .catch((error) => {
        res.status(500).send("Internal server error");
      });
  } catch (error) {
    res.status(401).send("Not authorized, token failed");
  }
};

module.exports = { protect };
