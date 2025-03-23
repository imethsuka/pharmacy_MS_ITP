import express from 'express';
import UserModel from './models/user.model.js';
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import authRoutes from "./routes/auth.routes.js";
import userRoute from "./routes/userRoute.js";
import inventoryRoute from './routes/inventoryRoute.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js'; // Import prescriptionRoutes
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./db/connectDB.js";

const app = express();

// __dirname for serving static files in production
const __dirname = path.resolve();

// Middleware for parsing request body and cookies
app.use(express.json());  // Middleware to parse JSON bodies
app.use(cookieParser());  // Middleware for cookie parsing (must be before any route that uses res.cookie())

// Middleware for handling CORS policy
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow requests from this origin
  credentials: true,               // Allow credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Serve static files from the public folder (if needed)
app.use(express.static('public'));  // Serve static files from the public directory

// Routing setup
app.use("/api", userRoute);         // Example API route for users
app.use('/books', booksRoute);      // Example route for books
app.use('/medicines', inventoryRoute); // Example route for medicines
app.use('/prescriptions', prescriptionRoutes); // Route for prescriptions
app.use("/api/auth", authRoutes);  // Authentication routes
app.use("/users", userRoute);      // User-related routes

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Basic health check route
app.get('/', (request, response) => {
  console.log(request);
  return response.status(200).send('Welcome To Sethsiri Pharmacy');
});

// Customer management routes
app.use(bodyParser.json());

// Create user route
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Get user by ID route
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Update user route
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({ _id: id }, 
    {
      name: req.body.name,
      email: req.body.email
    })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Delete user route
app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// Connect to MongoDB and start server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
