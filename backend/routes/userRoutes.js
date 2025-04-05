import express from 'express';
import User from '../models/userModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Public (TEMPORARILY)
router.get('/', async (req, res) => {
    // TEMPORARY: Removed protect and admin middleware
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Public (TEMPORARILY)
router.delete('/:id', async (req, res) => {
    // TEMPORARY: Removed protect and admin middleware
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public (TEMPORARILY)
router.get('/:id', async (req, res) => {
    // TEMPORARY: Removed protect and admin middleware
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Public (TEMPORARILY)
router.put('/:id', async (req, res) => {
    // TEMPORARY: Removed protect and admin middleware
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete all users (TEMPORARY endpoint)
// @route   DELETE /api/users/delete-all/confirm
// @access  Public (TEMPORARILY)
router.delete('/delete-all/confirm', async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: 'All users have been removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a new user (TEMPORARY simplification)
// @route   POST /api/users
// @access  Public (TEMPORARILY)
router.post('/', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Simple validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email and password' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password, // Will be hashed by pre-save hook
            role: role || 'customer'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
