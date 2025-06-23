const { supabaseAdmin } = require('../config/supabase-client');

exports.getActivities = async (req, res) => {
  const userId = req.user && (req.user.id || req.user.user_id);
  if (!userId) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
  }
  try {
    const { data, error } = await supabaseAdmin
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      return res.status(400).json({ success: false, error: { message: error.message, details: error.details } });
    }
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Failed to fetch activities', details: err.message } });
  }
};

exports.createActivity = async (req, res) => {
  const userId = req.user && (req.user.id || req.user.user_id);
  if (!userId) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
  }
  const { type, duration, distance, calories, date, notes } = req.body;
  try {
    const { data, error } = await supabaseAdmin
      .from('activities')
      .insert([{ user_id: userId, type, duration, distance, calories, date, notes }])
      .select()
      .single();
    if (error) {
      return res.status(400).json({ success: false, error: { message: error.message, details: error.details } });
    }
    return res.status(201).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Failed to create activity', details: err.message } });
  }
};

exports.getActivityById = async (req, res) => {
  const userId = req.user && (req.user.id || req.user.user_id);
  const { id } = req.params;
  if (!userId) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
  }
  try {
    const { data, error } = await supabaseAdmin
      .from('activities')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();
    if (error) {
      return res.status(404).json({ success: false, error: { message: 'Activity not found', details: error.details } });
    }
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Failed to fetch activity', details: err.message } });
  }
};

exports.updateActivity = async (req, res) => {
  const userId = req.user && (req.user.id || req.user.user_id);
  const { id } = req.params;
  const { type, duration, distance, calories, date, notes } = req.body;
  if (!userId) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
  }
  try {
    const { data, error } = await supabaseAdmin
      .from('activities')
      .update({ type, duration, distance, calories, date, notes })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();
    if (error) {
      return res.status(404).json({ success: false, error: { message: 'Activity not found or not updated', details: error.details } });
    }
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Failed to update activity', details: err.message } });
  }
};

exports.deleteActivity = async (req, res) => {
  const userId = req.user && (req.user.id || req.user.user_id);
  const { id } = req.params;
  if (!userId) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
  }
  try {
    const { error } = await supabaseAdmin
      .from('activities')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    if (error) {
      return res.status(404).json({ success: false, error: { message: 'Activity not found or not deleted', details: error.details } });
    }
    return res.status(200).json({ success: true, message: 'Activity deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Failed to delete activity', details: err.message } });
  }
};
