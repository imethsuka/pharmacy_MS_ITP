import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
const profileRoute = require('./routes/profile');



// ...existing code...

app.use('/api/profile', profileRoute);

// ...existing code...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
import express from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute.js';



app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/user_management', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
