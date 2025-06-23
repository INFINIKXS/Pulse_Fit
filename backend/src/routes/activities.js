const express = require('express');
const router = express.Router();
const { getActivities, createActivity, getActivityById, updateActivity, deleteActivity } = require('../controllers/activity-controller');
const { authenticateToken } = require('../middleware/auth-middleware');

router.get('/activities', authenticateToken, getActivities);
router.post('/activities', authenticateToken, createActivity);
router.get('/activities/:id', authenticateToken, getActivityById);
router.put('/activities/:id', authenticateToken, updateActivity);
router.delete('/activities/:id', authenticateToken, deleteActivity);

module.exports = router;
