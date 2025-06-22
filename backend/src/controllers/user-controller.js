const { supabaseClient, supabaseAdmin } = require('../config/supabase-client');
const path = require('path');

async function getSignedAvatarUrl(avatarPath) {
  if (!avatarPath) return null;
  const { data, error } = await supabaseClient.storage.from('avatars').createSignedUrl(avatarPath, 60 * 60); // 1 hour expiry
  if (error) return null;
  return data.signedUrl;
}

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
  async getMe(req, res, next) {
    try {
      const userId = req.user.id;
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) return handleApiError(res, error, 'PROFILE_NOT_FOUND', 404, error.details);
      if (!data) return handleApiError(res, { message: 'Profile not found' }, 'PROFILE_NOT_FOUND', 404);
      if (data.avatar_url) {
        data.avatar_signed_url = await getSignedAvatarUrl(data.avatar_url);
      }
      return res.json({
        success: true,
        data,
        message: 'User profile fetched'
      });
    } catch (error) {
      return handleApiError(res, error, 'INTERNAL_ERROR', 500);
    }
  },

  async updateMe(req, res, next) {
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: errors.array()
        }
      });
    }
    try {
      const userId = req.user.id;
      let updates = req.body;
      let avatarPath;

      if (req.file) {
        const file = req.file;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
          return handleApiError(res, { message: 'Invalid file type. Only JPEG, PNG, GIF allowed.' }, 'INVALID_FILE_TYPE', 400);
        }
        if (file.size > 1024 * 1024) {
          return handleApiError(res, { message: 'File too large. Max 1MB allowed.' }, 'FILE_TOO_LARGE', 400);
        }
        const ext = path.extname(file.originalname);
        avatarPath = `${userId}-${Date.now()}${ext}`;
        const { error: uploadError } = await supabaseClient.storage.from('avatars').upload(avatarPath, file.buffer, {
          contentType: file.mimetype
        });
        if (uploadError) {
          return handleApiError(res, { message: 'Avatar upload failed', details: uploadError.message }, 'AVATAR_UPLOAD_FAILED', 500);
        }
        updates.avatar_url = avatarPath;
      }
      const { data, error } = await supabaseClient
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .single();
      if (error) return handleApiError(res, error, 'PROFILE_UPDATE_FAILED', 500, error.details);
      if (!data) return handleApiError(res, { message: 'Profile not found' }, 'PROFILE_NOT_FOUND', 404);
      if (data.avatar_url) {
        data.avatar_signed_url = await getSignedAvatarUrl(data.avatar_url);
      }
      return res.json({
        success: true,
        data,
        message: 'User profile updated'
      });
    } catch (error) {
      return handleApiError(res, error, 'INTERNAL_ERROR', 500);
    }
  },

  async deleteMe(req, res, next) {
    try {
      const userId = req.user.id;
      const { error: profileError } = await supabaseClient
        .from('profiles')
        .delete()
        .eq('id', userId);
      if (profileError) return handleApiError(res, profileError, 'PROFILE_DELETE_FAILED', 500, profileError.details);
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
      if (authError) return handleApiError(res, authError, 'AUTH_DELETE_FAILED', 500, authError.message);
      return res.json({
        success: true,
        message: 'User and profile deleted'
      });
    } catch (error) {
      return handleApiError(res, error, 'INTERNAL_ERROR', 500);
    }
  }
};
