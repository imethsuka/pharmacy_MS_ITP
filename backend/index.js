import express from 'express';
import UserModel from './models/user.model.js';
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser"
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';

import authRoutes from "./routes/auth.routes.js";
import inventoryRoute from './routes/inventoryRoute.js';

import prescriptionRoute from './routes/prescriptionRoute.js'; // Import prescriptionRoutes

// import cors from 'cors';


import driverRoute from './routes/driverRoute.js' 

import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./db/connectDB.js";
import route from "./routes/userRoute.js";
const app = express();

const __dirname = path.resolve();

// Middleware for parsing request body
app.use(express.json());
app.use(cookieParser()); // allows us to parse incoming cookies

// Middleware for handling CORS POLICY
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow requests from both ports
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


// Serve static files from the public folder
app.use(express.static('public')); // Add this line to serve static files

app.use(cors(corsOptions));
app.use("/api", route);
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To Sethsiri Pharmacy');
// =======
// app.use(cors(corsOptions));
// app.use("/api", route);
// app.get('/', (request, response) => {
//   console.log(request);
//   return response.status(200).send('Welcome To MERN Stack Tutorial');
// >>>>>>> G_Branch_Beta
});

// Add static file serving for uploads
app.use('/uploads', express.static('uploads'));

app.use('/books', booksRoute);


app.use('/medicines', inventoryRoute);
// <<<<<<< main
app.use('/prescriptions', prescriptionRoute); // Use prescriptionRoutes
// =======
app.use("/api/auth", authRoutes);

// Import the order routes
import orderRoute from './routes/orderRoute.js';

// Add this line where you define your routes
app.use('/api/orders', orderRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// For customer management
app.use(bodyParser.json());
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

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

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});


app.use('/drivers',driverRoute);


app.use('/medicines',inventoryRoute);


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

