const helmet = require("helmet");
const hpp = require("hpp");
const { body, validationResult } = require("express-validator");

// Security middleware configuration
function security(app) {
  // Set security HTTP headers with strict CSP
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", "blob:", "data:"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          connectSrc: ["'self'"],
          upgradeInsecureRequests: [],
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // Prevent HTTP parameter pollution
  app.use(hpp());

  // Custom security middleware
  app.use((req, res, next) => {
    // Validate Content-Type for file uploads
    if (req.path === "/api/compress" && req.method === "POST") {
      const contentType = req.headers["content-type"] || "";
      if (!contentType.includes("multipart/form-data")) {
        return res.status(415).json({
          error: "Unsupported Media Type. Please use multipart/form-data.",
        });
      }
    }
    next();
  });
}

// Validation middleware for file uploads
const validateFileUpload = [
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(415).json({
        error:
          "Unsupported file type. Please upload JPEG, PNG, or WebP images only.",
      });
    }

    // 10MB file size limit
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (req.file.size > maxSize) {
      return res.status(413).json({
        error: "File too large. Maximum size is 10MB.",
      });
    }

    next();
  },
];

module.exports = { security, validateFileUpload };
