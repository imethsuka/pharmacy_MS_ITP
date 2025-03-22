const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Get profile
router.get('/', (req, res) => {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send(err);
        res.send(user);
    });
});

// Update profile
router.put('/', (req, res) => {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const updatedProfile = req.body;
    User.findByIdAndUpdate(userId, updatedProfile, { new: true }, (err, user) => {
        if (err) return res.status(500).send(err);
        res.send(user);
    });
});

module.exports = router;
