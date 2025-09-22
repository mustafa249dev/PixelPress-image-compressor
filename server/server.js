const express = require("express");
const { security } = require("./config/security");
const corsConfig = require("./config/corsConfig");

// Initialize Express app
const app = express();

// Apply global security middleware
security(app);

// Middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware
app.use(corsConfig);

// Routes
const compressRoute = require("./routes/compress");
app.use("/api", compressRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
