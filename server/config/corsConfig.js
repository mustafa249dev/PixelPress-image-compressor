const cors = require("cors");

// CORS configuration
const corsOptions = {
  origin: [
    'https://pixelpress1.vercel.app',
    'http://localhost:5173', // For local development
  ],
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
