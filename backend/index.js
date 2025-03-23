import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import orderRoute from './routes/orderRoute.js';
import inventoryRoute from './routes/inventoryRoute.js';
import cors from 'cors';
import multer from 'multer'; // Import multer for file uploads
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(
  cors({
    origin: 'http://localhost:5173', // ✅ Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // ✅ Allow cookies/sessions
  })
);

// Middleware for parsing request body
app.use(express.json());

// Serve static files from the public folder
app.use(express.static('public')); // Add this line to serve static files

// Add static file serving for uploads
app.use('/uploads', express.static('uploads'));

// Multer setup for file uploads
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the current directory path

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
const fs = require('fs');
const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// File upload endpoint
app.post('/api/upload', upload.array('files'), (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }
    res.status(200).json({ message: 'Files uploaded successfully.', files });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
});

// Routes
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To Sethsiri Pharmacy');
});

app.use('/orders', orderRoute);
app.use('/books', booksRoute);
app.use('/medicines', inventoryRoute);
app.use('/api/orders', orderRoute);
app.use("/api", uploadRoute);

// Connect to MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });