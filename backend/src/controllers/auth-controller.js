// ...boilerplate for controller...
const authService = require('../services/auth-service');
const { validationResult } = require('express-validator');

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

module.exports = {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleApiError(res, { message: 'Validation failed' }, 'VALIDATION_ERROR', 400, errors.array());
      }
      // Delegate to service
      const result = await authService.register(req.body);
      res.status(201).json({
        success: true,
        data: result,
        message: 'User registered successfully'
      });
    } catch (error) {
      return handleApiError(res, error, 'REGISTER_FAILED', 500, error.details);
    }
  },

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return handleApiError(res, { message: 'Validation failed' }, 'VALIDATION_ERROR', 400, errors.array());
      }
      // Delegate to service
      const result = await authService.login(req.body);
      res.status(200).json({
        success: true,
        data: result,
        message: 'Login successful'
      });
    } catch (error) {
      return handleApiError(res, error, 'LOGIN_FAILED', 500, error.details);
    }
  }
};
