import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { mongoDBURL } from '../config.js';
import User from '../models/userModel.js';

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoDBURL);
        console.log('Connected to MongoDB successfully');

        // Check if admin user already exists
        const adminExists = await User.findOne({ email: 'admin@gmail.com' });

        if (adminExists) {
            console.log('Admin user already exists with this email');
            process.exit(0);
        }

        // Create admin user with predefined credentials
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@gmail.com',
            password: 'admin123',  // This will be hashed by the pre-save hook
            role: 'admin'
        });

        if (adminUser) {
            console.log('Admin user created successfully:');
            console.log(`- Name: ${adminUser.name}`);
            console.log(`- Email: admin@gmail.com`);
            console.log(`- Password: admin123`);
            console.log('Please change the password after first login!');
        }

    } catch (error) {
        console.error(`Error creating admin: ${error.message}`);
    } finally {
        // Close the database connection
        console.log('Closing database connection');
        await mongoose.connection.close();
        process.exit(0);
    }
};

// Run the function
createAdminUser();