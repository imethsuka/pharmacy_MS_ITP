import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { connectDB } from '../config.js';

const createAdminUser = async () => {
    try {
        // Connect to the database
        await connectDB();
        console.log('Connected to MongoDB...');

        // Check if admin user already exists
        const adminExists = await User.findOne({ role: 'admin' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@pharmacy.com',
            password: 'admin123',  // This will be hashed by the pre-save hook
            role: 'admin'
        });

        if (adminUser) {
            console.log('Admin user created:');
            console.log(`- Email: admin@pharmacy.com`);
            console.log(`- Password: admin123`);
            console.log('Please change the password after first login!');
        }

        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdminUser();