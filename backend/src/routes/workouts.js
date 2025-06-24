const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout-controller');
const { authenticateToken } = require('../middleware/auth-middleware');

// GET /api/workouts - List all workouts
router.get('/', authenticateToken, workoutController.getAllWorkouts);

// POST /api/workouts - Create a new workout
router.post('/', authenticateToken, workoutController.createWorkout);

// GET /api/workouts/:id - Get a workout by ID
router.get('/:id', authenticateToken, workoutController.getWorkoutById);

// PUT /api/workouts/:id - Update a workout by ID
router.put('/:id', authenticateToken, workoutController.updateWorkoutById);

// DELETE /api/workouts/:id - Delete a workout by ID
router.delete('/:id', authenticateToken, workoutController.deleteWorkoutById);

module.exports = router;
