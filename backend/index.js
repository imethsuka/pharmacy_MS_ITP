// NEW CODE implemented by iM

import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import prescriptionRoute from "./routes/prescriptionRoutes.js"; // Import the new route
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Serve static files from the public folder
app.use(express.static("public"));

// Routes
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);
app.use("/medicines", inventoryRoute);
app.use("/prescriptions", prescriptionRoute); // Use the new route

// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });








// import express from 'express';
// import { PORT, mongoDBURL } from './config.js';
// import mongoose from 'mongoose';
// import booksRoute from './routes/booksRoute.js';
// import inventoryRoute from './routes/inventoryRoute.js';
// import cors from 'cors';

// const app = express();

// // Middleware for parsing request body
// app.use(express.json());

// // Middleware for handling CORS POLICY
// // Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// // Option 2: Allow Custom Origins
// // app.use(
// //   cors({
// //     origin: 'http://localhost:3000',
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     allowedHeaders: ['Content-Type'],
// //   })
// // );

// app.get('/', (request, response) => {
//   console.log(request);
//   return response.status(234).send('Welcome To MERN Stack Tutorial');
// });

// app.use('/books', booksRoute);
// app.use('/medicines',inventoryRoute);

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log('App connected to database');
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });




