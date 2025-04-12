const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Logout controller
exports.logout = async (req, res) => {
    try {
        // Clear the session cookie
        res.clearCookie('session');
        
        // Optionally, you can also clear any other cookies you set
        res.clearCookie('token');
        
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error logging out'
        });
    }
};

// Other auth controllers... 