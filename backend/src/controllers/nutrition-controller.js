const { getUserSupabaseClient } = require('../config/supabase-client');

// GET /api/nutrition - List all nutrition entries for the user
exports.getNutritionEntries = async (req, res) => {
  const jwt = req.user && req.user.token;
  const userId = req.user && (req.user.id || req.user.user_id);
  if (!jwt || !userId) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
  }
  try {
    const supabase = getUserSupabaseClient(jwt);
    const { data, error } = await supabase
      .from('nutrition')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    if (error) {
      return res.status(400).json({ success: false, error: { message: error.message, details: error.details } });
    }
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Failed to fetch nutrition entries', details: err.message } });
  }
};

// POST /api/nutrition - Add a new nutrition entry
exports.createNutritionEntry = async (req, res) => {
  const jwt = req.user && req.user.token;
  const userId = req.user && (req.user.id || req.user.user_id);
  if (!jwt || !userId) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
  }
  const { food, calories, protein, carbs, fat, date, notes } = req.body;
  if (!food || !calories || !date) {
    return res.status(400).json({ success: false, error: { message: 'Missing required fields' } });
  }
  try {
    const supabase = getUserSupabaseClient(jwt);
    const { data, error } = await supabase
      .from('nutrition')
      .insert([{ user_id: userId, food, calories, protein, carbs, fat, date, notes }])
      .select()
      .single();
    if (error) {
      return res.status(400).json({ success: false, error: { message: error.message, details: error.details } });
    }
    return res.status(201).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Failed to create nutrition entry', details: err.message } });
  }
};
