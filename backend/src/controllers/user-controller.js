const { supabaseClient, supabaseAdmin } = require('../config/supabase-client');

module.exports = {
  async getMe(req, res, next) {
    try {
      const userId = req.user.id;
      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      res.json({
        success: true,
        data,
        message: 'User profile fetched'
      });
    } catch (error) {
      next(error);
    }
  },

  async updateMe(req, res, next) {
    try {
      const userId = req.user.id;
      const updates = req.body;
      const { data, error } = await supabaseClient
        .from('users')
        .update(updates)
        .eq('id', userId)
        .single();
      if (error) throw error;
      res.json({
        success: true,
        data,
        message: 'User profile updated'
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteMe(req, res, next) {
    try {
      const userId = req.user.id;
      // Delete profile row
      const { error: profileError } = await supabaseClient
        .from('users')
        .delete()
        .eq('id', userId);
      if (profileError) throw profileError;
      // Delete user from Supabase Auth
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
      if (authError) throw authError;
      res.json({
        success: true,
        message: 'User and profile deleted'
      });
    } catch (error) {
      next(error);
    }
  }
};
