import express from 'express';
import dotenv from "dotenv";
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import authRoutes from "./routes/auth.routes.js";
import inventoryRoute from './routes/inventoryRoute.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./db/connectDB.js";
dotenv.config();
const app = express();

const __dirname = path.resolve();

// Middleware for parsing request body
app.use(express.json());
app.use(cookieParser()); // allows us to parse incoming cookies

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);
app.use('/medicines',inventoryRoute);
app.use("/api/auth", authRoutes);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

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
