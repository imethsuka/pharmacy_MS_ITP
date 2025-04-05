const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pharmacyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function createAdminUser() {
  try {
    // Demo credentials (change these in production)
    const adminData = {
      username: "admin",
      password: "admin123", // Plain password
      email: "admin@pharmacy.com",
      role: "admin"
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create admin user
    const adminUser = new User({
      username: adminData.username,
      password: hashedPassword,
      email: adminData.email,
      role: adminData.role
    });

    // Save to database
    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Username:', adminData.username);
    console.log('Password:', adminData.password);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdminUser();
