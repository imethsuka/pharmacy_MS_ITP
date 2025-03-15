import express from "express";
import multer from "multer";
import Prescription from "../models/Prescription.js"; // Create this model

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload prescription
router.post("/upload", upload.single("prescription"), async (req, res) => {
  try {
    const filePath = `/images/${req.file.filename}`;

    // Save file path to MongoDB
    const prescription = new Prescription({ filePath });
    await prescription.save();

    res.status(200).json({ success: true, filePath });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to upload file." });
  }
});

export default router;