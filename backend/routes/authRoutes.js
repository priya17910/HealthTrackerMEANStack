// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.register);

// Authenticate user and get token
router.post('/login', authController.login);

module.exports = router;
