const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Logout route
router.post('/logout', isAuthenticated, authController.logout);

// Other auth routes...

module.exports = router; 