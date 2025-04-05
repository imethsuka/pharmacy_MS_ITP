import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { mongoDBURL } from '../config.js';

// Connect to MongoDB
mongoose.connect(mongoDBURL)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => {
    console.error('Could not connect to MongoDB...', err);
    process.exit(1);
  });

// Define User schema (simplified version of your userModel.js)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  phone: String
}, { timestamps: true });

// Create User model
const User = mongoose.model('MyUser', userSchema);

async function createAdmin() {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@gmail.com' });
    
    if (adminExists) {
      console.log('Admin user already exists!');
      return process.exit(0);
    }
    
    // Create salt & hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Create admin user
    const admin = new User({
      name: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    await admin.save();
    
    console.log('Admin user created successfully:');
    console.log('Email: admin@gmail.com');
    console.log('Password: admin123');
    console.log('Username: admin');
    console.log('Role: admin');
    console.log('Please change these credentials after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();