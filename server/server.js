const express = require("express");
const { security } = require("./config/security");
const cors = require("cors");

// Initialize Express app
const app = express();

// Apply global security middleware
security(app);

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration based on environment
const allowedOrigins = [
  "http://localhost:5173", // Local Vite development
  "https://your-frontend-domain.com", // Replace with your deployed frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Routes
const compressRoute = require("./routes/compress");
app.use("/api", compressRoute);

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
