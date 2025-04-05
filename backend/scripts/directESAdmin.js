import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// MongoDB connection string
const mongoDBURL = 'mongodb+srv://root:root@sethpharm.tlnkh.mongodb.net/Pharmacy';

async function addAdminUser() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoDBURL);
    console.log('Connected to MongoDB');

    // Define a simple user schema (matching your userModel.js)
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    // Create a model
    const User = mongoose.model('User', userSchema);
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Create admin user object with new distinct credentials
    const adminUser = {
      name: 'Super Admin',
      email: 'superadmin@pharmacy.com',
      password: hashedPassword,
      role: 'admin'
    };
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists with email:', adminUser.email);
      console.log('Admin credentials:');
      console.log('- Email:', adminUser.email);
      console.log('- Password: admin123');
    } else {
      // Insert admin user
      const result = await User.create(adminUser);
      console.log('Admin user created successfully!');
      console.log('Admin credentials:');
      console.log('- Email:', adminUser.email);
      console.log('- Password: admin123');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the function
addAdminUser();