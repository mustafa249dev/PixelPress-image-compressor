const express = require("express");
const sharp = require("sharp");
const upload = require("../config/multerConfig");
const limiter = require("../config/rateLimit");
const { validateFileUpload } = require("../config/security");

const router = express.Router();

// POST endpoint to handle image upload and compression
router.post(
  "/compress",
  limiter,
  upload.single("image"),
  validateFileUpload,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }
      const buffer = req.file.buffer;
      // Compress the image using sharp
      const compressedImage = await sharp(buffer)
        .resize({ width: 1024 }) // Resize to a max width of 1024px
        .jpeg({ quality: 80 }) // Compress to 80% quality
        .toBuffer();

      // Set the response headers
      res.set("Content-Type", "image/jpeg");
      res.set("Content-Disposition", 'attachment; filename="compressed.jpg"');

      // Send the compressed image back to the client
      res.send(compressedImage);
    } catch (error) {
      console.error("Error processing image:", error);
      res.status(500).send("Error processing image");
    }
  }
);

module.exports = router;
