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

import prescriptionRoute from './routes/prescriptionRoute.js';
import driverRoute from './routes/driverRoute.js';
import orderRoute from './routes/orderRoute.js';

import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import { connectDB } from "./db/connectDB.js";
import route from "./routes/userRoute.js";

const app = express();
const __dirname = path.resolve();

// IMPORTANT: Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware for parsing request body
app.use(express.json());
app.use(cookieParser());

// Middleware for handling CORS POLICY
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Setup API routes
console.log('Setting up API routes...');

// Most specific routes first
app.use('/api/orders', orderRoute);
console.log('✅ Order routes mounted at /api/orders');

// Then other routes
app.use('/api/books', booksRoute);
app.use('/api/medicines', inventoryRoute);
app.use('/api/prescriptions', prescriptionRoute);
app.use("/api/auth", authRoutes);
app.use('/api/drivers', driverRoute);
app.use("/api", route);

// Add test endpoints - make sure these are directly on the app, not under /api
app.get('/test-direct', (req, res) => {
  console.log('Direct test endpoint hit');
  return res.status(200).json({ message: 'Direct test route works!' });
});

app.get('/api/test', (req, res) => {
  console.log('API test endpoint hit');
  return res.status(200).json({ message: 'API is working!' });
});

app.get('/api/orders/test', (req, res) => {
  console.log('Orders test endpoint hit');
  return res.status(200).json({ message: 'Orders API is working!' });
});

app.post('/api/orders-direct', (req, res) => {
  console.log('Direct orders test endpoint hit');
  console.log('Request body:', req.body);
  return res.status(201).json({ 
    message: 'Direct order creation simulation',
    _id: 'test-order-id-' + Date.now(),
    ...req.body
  });
});

// Legacy non-API routes (consider migrating these to use /api prefix for consistency)
app.use('/books', booksRoute);
app.use('/medicines', inventoryRoute);

app.use('/prescriptions', prescriptionRoute);
app.use('/drivers', driverRoute);

// Debugging route to list all registered routes
app.get('/api/debug/routes', (req, res) => {
  const routes = [];
  
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      // Routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') {
      // Router middleware
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods),
            baseRoute: middleware.regexp.toString()
          });
        }
      });
    }

// <<<<<<< main
app.use('/prescriptionuploadform', prescriptionRoute); // Use prescriptionRoutes
// =======
app.use('/test', testRoute);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));

  });
  
  res.json(routes);
});

// Homepage route
app.get('/', (request, response) => {
  return response.status(200).send('Welcome To Sethsiri Pharmacy');
});

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

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Connect to database and start server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
      console.log(`Orders API available at http://localhost:${PORT}/api/orders`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

