// src/middleware/auth-middleware.js
const { supabaseAdmin } = require('../config/supabase-client');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'No token provided',
        code: 'NO_TOKEN'
      }
    });
  }
  try {
    // Verify JWT with Supabase
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data || !data.user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid or expired token',
          code: 'INVALID_TOKEN',
          details: error
        }
      });
    }
    req.user = data.user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Authentication failed',
        code: 'AUTH_FAILED',
        details: err.message
      }
    });
  }
}

module.exports = { authenticateToken };
