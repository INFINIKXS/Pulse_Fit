// ...boilerplate for Express router...
const express = require('express');
const router = express.Router();

// Import validators and controller (to be implemented in next steps)
const { registerValidator, loginValidator } = require('../validators/auth-validators');
const authController = require('../controllers/auth-controller');

// Register endpoint
router.post('/register', registerValidator, authController.register);

// Login endpoint
router.post('/login', loginValidator, authController.login);

module.exports = router;
