import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { protect } from '../middleware/authMiddleware.js';
import { JWT_SECRET } from '../config.js';

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
	try {
		const { name, email, password, phone, address } = req.body;

		// Check if user already exists
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: 'User already exists' });
		}

		// Create user
		const user = await User.create({
			name,
			email,
			password,
			phone,
			address
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				phone: user.phone || '',
				address: user.address || {},
				token: generateToken(user._id)
			});
		} else {
			res.status(400).json({ message: 'Invalid user data' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find the user
		const user = await User.findOne({ email });

		// Check if user exists and password matches
		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				phone: user.phone || '',
				address: user.address || {},
				token: generateToken(user._id)
			});
		} else {
			res.status(401).json({ message: 'Invalid email or password' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-password');

		if (user) {
			// Ensure address exists to prevent frontend errors
			if (!user.address) {
				user.address = {
					street: '',
					city: '',
					state: '',
					zipCode: ''
				};
			}

			console.log("Sending user profile:", user);
			res.json(user);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		console.error("Profile fetch error:", error);
		res.status(500).json({ message: 'Server Error' });
	}
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			user.phone = req.body.phone || user.phone;
			user.address = req.body.address || user.address;

			if (req.body.password) {
				user.password = req.body.password;
			}

			const updatedUser = await user.save();

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				role: updatedUser.role,
				phone: updatedUser.phone || '',
				address: updatedUser.address || {},
				token: generateToken(updatedUser._id)
			});
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
});

export default router;
