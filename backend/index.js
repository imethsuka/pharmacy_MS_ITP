import express from 'express';
import UserModel from './models/user.model.js';
import dotenv from "dotenv";
dotenv.config();

import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import authRoutes from "./routes/auth.routes.js";
import inventoryRoute from './routes/inventoryRoute.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./db/connectDB.js";

const app = express();

const __dirname = path.resolve();

// Middleware for parsing request body
app.use(express.json());
app.use(cookieParser()); // allows us to parse incoming cookies

// Middleware for handling CORS POLICY
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.get('/', (request, response) => {
  console.log(request);
  return response.status(200).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);
app.use('/medicines', inventoryRoute);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// For customer management
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