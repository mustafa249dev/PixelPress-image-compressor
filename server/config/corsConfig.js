const cors = require("cors");

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins (for production, specify allowed origins)
};

module.exports = cors(corsOptions);
