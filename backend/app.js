// ...boilerplate for Express app...
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./src/routes/auth-routes');
const { authenticateToken } = require('./src/middleware/auth-middleware');
const userRoutes = require('./src/routes/user-routes');
const goalRoutes = require('./src/routes/goals');
const activitiesRoutes = require('./src/routes/activities');
const workoutsRoutes = require('./src/routes/workouts');
const progressRoutes = require('./src/routes/progress');
const nutritionRoutes = require('./src/routes/nutrition');
const analyticsRoutes = require('./src/routes/analytics');
// ...import other routes as needed...

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/', limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
// ...add requestLogger middleware if implemented...

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api', goalRoutes);
app.use('/api', activitiesRoutes);
app.use('/api/workouts', workoutsRoutes);
app.use('/api', progressRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/analytics', analyticsRoutes);
// ...register other routes as needed...

// ...add error handler middleware if implemented...

module.exports = app;
