import express from 'express';
import { updateProfile } from '../controllers/profile.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Update profile route
router.put('/update', verifyToken, upload.single('profilePicture'), updateProfile);

export default router; 