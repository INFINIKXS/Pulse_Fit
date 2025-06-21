const { supabaseClient } = require('../config/supabase-client');

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
  }
};
