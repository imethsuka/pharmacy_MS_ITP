const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
const fs = require("fs");
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// File upload endpoint
router.post("/upload", upload.array("files"), (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }
    res.status(200).json({ message: "Files uploaded successfully.", files });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
});

module.exports = router;