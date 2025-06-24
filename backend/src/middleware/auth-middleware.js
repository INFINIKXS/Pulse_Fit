// src/middleware/auth-middleware.js
const { supabaseAdmin } = require('../config/supabase-client');

function handleApiError(res, error, code = 'INTERNAL_ERROR', status = 500, details = undefined) {
  return res.status(status).json({
    success: false,
    error: {
      message: error.message || 'An error occurred',
      code,
      details: details || error.details || undefined
    }
  });
}

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Incoming Authorization header:', authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return handleApiError(res, { message: 'No token provided' }, 'NO_TOKEN', 401);
  }
  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data || !data.user) {
      return handleApiError(res, { message: 'Invalid or expired token', details: error }, 'INVALID_TOKEN', 401);
    }
    // Patch: set req.user.id, req.user.sub, and req.user.token for downstream RLS
    req.user = {
      ...data.user,
      id: data.user.id, // Supabase user id
      sub: data.user.sub || data.user.id, // Always set sub for RLS
      token: token // Raw JWT for Supabase client
    };
    next();
  } catch (err) {
    return handleApiError(res, { message: 'Authentication failed', details: err.message }, 'AUTH_FAILED', 401);
  }
}

module.exports = { authenticateToken };
