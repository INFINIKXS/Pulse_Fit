// routes/goals.js
// Fitness Goals API routes for Pulse Fit

const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { authenticateToken } = require('../middleware/auth-middleware');
const goalController = require('../controllers/goal-controller');

// POST /users/me/goals
router.post(
  '/users/me/goals',
  authenticateToken,
  [
    body('goal_type').isString().notEmpty(),
    body('target_value').isNumeric(),
    body('start_date').optional().isISO8601(),
    body('end_date').optional().isISO8601()
  ],
  goalController.createGoal
);

// GET /users/me/goals
router.get(
  '/users/me/goals',
  authenticateToken,
  goalController.getGoals
);

// PUT /users/me/goals/:id
router.put(
  '/users/me/goals/:id',
  authenticateToken,
  [
    param('id').isUUID(),
    body('goal_type').optional().isString().notEmpty(),
    body('target_value').optional().isNumeric(),
    body('start_date').optional().isISO8601(),
    body('end_date').optional().isISO8601()
  ],
  goalController.updateGoal
);

// DELETE /users/me/goals/:id
router.delete(
  '/users/me/goals/:id',
  authenticateToken,
  [param('id').isUUID()],
  goalController.deleteGoal
);

module.exports = router;
