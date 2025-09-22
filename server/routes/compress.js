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
      const originalBuffer = req.file.buffer;
      const originalSize = originalBuffer.length;

      // Compress the image using sharp
      const compressedImage = await sharp(originalBuffer)
        .resize({ width: 1024 }) // Resize to a max width of 1024px
        .jpeg({ quality: 80 }) // Compress to 80% quality
        .toBuffer();

      const compressedSize = compressedImage.length;
      const compressionRatio = (
        ((originalSize - compressedSize) / originalSize) *
        100
      ).toFixed(2);

      // Send response with image and metadata
      res.json({
        originalSize,
        compressedSize,
        compressionRatio,
        compressedImage: compressedImage.toString("base64"),
      });
    } catch (error) {
      console.error("Error processing image:", error);
      res.status(500).send("Error processing image");
    }
  }
);

module.exports = router;
