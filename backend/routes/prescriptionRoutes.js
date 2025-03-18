import express from 'express';
import multer from 'multer';
import Prescription from '../models/Prescription.js';

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Save files to the public/images folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Upload prescription
router.post('/upload', upload.single('prescription'), async (req, res) => {
  try {
    const filePath = `/images/${req.file.filename}`;

    // Save file path to MongoDB
    const prescription = new Prescription({ filePath });
    await prescription.save();

    res.status(200).json({ success: true, filePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'Failed to upload file.' });
  }
});

export default router;