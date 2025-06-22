const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const { body } = require('express-validator');
const { authenticateToken } = require('../middleware/auth-middleware');
const multer = require('multer');

// Use memory storage for avatar uploads
const upload = multer({ storage: multer.memoryStorage() });

// GET /api/users/me
router.get('/me', authenticateToken, userController.getMe);
// PUT /api/users/me
router.put(
  '/me',
  authenticateToken,
  upload.single('avatar'),
  [
    body('full_name').optional().trim().notEmpty().withMessage('Full name is required'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
    body('bio').optional().isString().isLength({ max: 500 }).withMessage('Bio must be up to 500 characters'),
    // No validation for avatar here, handled in controller
  ],
  userController.updateMe
);
// DELETE /api/users/me
router.delete('/me', authenticateToken, userController.deleteMe);

module.exports = router;
