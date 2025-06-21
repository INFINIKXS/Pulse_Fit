const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// GET /api/users/me
router.get('/me', userController.getMe);
// PUT /api/users/me
router.put('/me', userController.updateMe);

module.exports = router;
