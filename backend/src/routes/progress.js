// src/routes/progress.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth-middleware');
const progressController = require('../controllers/progress-controller');

console.log('progressController.getUserProgress:', typeof progressController.getUserProgress);
// GET /api/users/me/progress
router.get('/users/me/progress', authenticateToken, progressController.getUserProgress);

module.exports = router;
