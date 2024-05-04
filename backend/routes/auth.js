// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// POST route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (!user || password !== user.password) {
      return res.status(401).json({ success: false });
    }

    // If user and password are correct, send success response
    res.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Login failed. Please try again later.' });
  }
});

module.exports = router;
