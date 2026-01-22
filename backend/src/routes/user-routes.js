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
    body('gender').optional().isIn(['male', 'female']).withMessage('Gender must be male or female'),
    body('height').optional().isString().withMessage('Height must be a string'),
    body('weight').optional().isString().withMessage('Weight must be a string'),
    body('bio').optional().isString().isLength({ max: 500 }).withMessage('Bio must be up to 500 characters'),
    body('environment').optional().isString().withMessage('Environment must be a string'),
    body('availability').optional().isArray().withMessage('Availability must be an array'),
    body('onboarding_completed').optional().isBoolean().withMessage('Onboarding completed must be a boolean'),
    body('fitness_goals').optional().isArray().withMessage('Fitness goals must be an array'),
    body('mental_wellness_goals').optional().isArray().withMessage('Mental wellness goals must be an array'),
    // No validation for avatar here, handled in controller
  ],
  userController.updateMe
);
// DELETE /api/users/me
router.delete('/me', authenticateToken, userController.deleteMe);

module.exports = router;
