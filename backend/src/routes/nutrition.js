const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth-middleware');
const { getNutritionEntries, createNutritionEntry } = require('../controllers/nutrition-controller');

// GET /api/nutrition - List all nutrition entries
router.get('/', authenticateToken, getNutritionEntries);
// POST /api/nutrition - Add a new nutrition entry
router.post('/', authenticateToken, createNutritionEntry);

module.exports = router;
