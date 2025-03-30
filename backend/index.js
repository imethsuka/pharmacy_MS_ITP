import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';


import booksRoute from './routes/booksRoute.js';
import orderRoute from './routes/orderRoute.js';
import inventoryRoute from './routes/inventoryRoute.js';


import prescriptionRoute from './routes/prescriptionRoute.js'; // Import prescriptionRoutes


import driverRoute from './routes/driverRoute.js' 
import feedbackRoute from './routes/feedbackRoute.js';
import route from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./db/connectDB.js";


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

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To Sethsiri Pharmacy');
});

// Add static file serving for uploads
app.use('/uploads', express.static('uploads'));
app.use('/orders', orderRoute);
app.use('/books', booksRoute);
app.use('/medicines',inventoryRoute);
app.use('/orders', orderRoute)
app.use('/prescriptions', prescriptionRoute);
app.use('/users', route);
app.use('/drivers', driverRoute);
app.use('/feedbacks', feedbackRoute);
app.use(cookieParser());


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

