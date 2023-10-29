// Load environment variables from a .env file
require("dotenv").config();

// Set up the Express application
const express = require("express");
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
app.use(cors());

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Connect to the database
const connectDB = require("./configs/DB");
(async () => {
  try {
    await connectDB(); // Wait for the database to connect

    // Define user routes
    const userRoutes = require("./routes/userRoutes");
    app.use(express.json()); // Accept JSON data
    app.use("/api/user", userRoutes);

    // Define a basic route
    app.get("/", (req, res) => {
      res.json({ message: "API is running." });
    });

    // Start the server on the specified port
    app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
})();
