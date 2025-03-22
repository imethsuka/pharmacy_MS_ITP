import express from 'express';
import { Prescription } from '../models/prescriptionModel.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/prescriptions';
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only image and PDF files are allowed!'));
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Route to upload a prescription
router.post('/upload', upload.single('prescriptionFile'), async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).json({ message: 'No file uploaded' });
    }

    const newPrescription = {
      filePath: request.file.path,
      fileName: request.file.filename,
      userId: request.body.userId || 'guest', // Use actual user ID if available
      notes: request.body.notes || '',
    };

    const prescription = await Prescription.create(newPrescription);

    return response.status(201).json({
      success: true,
      prescription,
      message: 'Prescription uploaded successfully'
    });
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ 
      success: false,
      message: error.message 
    });
  }
});

// Route to get a prescription by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const prescription = await Prescription.findById(id);
    
    if (!prescription) {
      return response.status(404).json({ message: 'Prescription not found' });
    }
    
    return response.status(200).json(prescription);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all prescriptions (possibly with filters)
router.get('/', async (request, response) => {
  try {
    // You could add query parameters for filtering
    const prescriptions = await Prescription.find({});
    
    return response.status(200).json({
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
