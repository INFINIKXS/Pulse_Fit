// controllers/goal-controller.js
// Controller for Fitness Goals API

const { getUserSupabaseClient } = require('../config/supabase-client');

exports.createGoal = async (req, res) => {
  // Extract validated fields
  let { goal_type, target_value, start_date, end_date } = req.body;
  const jwt = req.user && req.user.token;
  const userId = req.user && (req.user.id || req.user.user_id);

  if (!jwt || !userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Set default values for start_date and end_date if not provided
  if (!start_date) {
    start_date = new Date().toISOString().split('T')[0]; // Default to today (YYYY-MM-DD)
  }
  if (!end_date) {
    // Default: 30 days from today
    const d = new Date();
    d.setDate(d.getDate() + 30);
    end_date = d.toISOString().split('T')[0];
  }

  try {
    const supabase = getUserSupabaseClient(jwt);
    const { data, error } = await supabase
      .from('fitness_goals')
      .insert([
        {
          user_id: userId,
          goal_type,
          target_value,
          start_date,
          end_date
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message, details: error.details });
    }

    return res.status(201).json({
      message: 'Goal created',
      goal: data
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create goal', details: err.message });
  }
};

exports.getGoals = async (req, res) => {
  const jwt = req.user && req.user.token;
  const userId = req.user && (req.user.id || req.user.user_id);
  if (!jwt || !userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const supabase = getUserSupabaseClient(jwt);
    const { data, error } = await supabase
      .from('fitness_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      return res.status(400).json({ error: error.message, details: error.details });
    }
    return res.status(200).json({ goals: data });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch goals', details: err.message });
  }
};

exports.updateGoal = async (req, res) => {
  const jwt = req.user && req.user.token;
  const userId = req.user && (req.user.id || req.user.user_id);
  const { id } = req.params;
  const { goal_type, target_value, start_date, end_date } = req.body;
  if (!jwt || !userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const supabase = getUserSupabaseClient(jwt);
    const { data: existingGoal, error: selectError } = await supabase
      .from('fitness_goals')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId);
    if (selectError) {
      return res.status(400).json({ error: selectError.message, details: selectError.details });
    }
    if (!existingGoal || existingGoal.length === 0) {
      return res.status(404).json({ error: 'Goal not found (pre-update select)' });
    }
    const { data, error } = await supabase
      .from('fitness_goals')
      .update({ goal_type, target_value, start_date, end_date })
      .eq('id', id)
      .eq('user_id', userId)
      .select();
    if (error) {
      return res.status(400).json({ error: error.message, details: error.details });
    }
    if (!data || data.length === 0) {
      return res.status(200).json({ message: 'Goal already up to date', goal: existingGoal[0] });
    }
    return res.status(200).json({ message: 'Goal updated', goal: data[0] });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update goal', details: err.message });
  }
};

exports.deleteGoal = async (req, res) => {
  const jwt = req.user && req.user.token;
  const userId = req.user && (req.user.id || req.user.user_id);
  const { id } = req.params;
  if (!jwt || !userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const supabase = getUserSupabaseClient(jwt);
    const { error } = await supabase
      .from('fitness_goals')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    if (error) {
      return res.status(400).json({ error: error.message, details: error.details });
    }
    return res.status(200).json({ message: 'Goal deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete goal', details: err.message });
  }
};
