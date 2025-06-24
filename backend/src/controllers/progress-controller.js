// src/controllers/progress-controller.js
const { getUserSupabaseClient } = require('../config/supabase-client');

// GET /api/users/me/progress
exports.getUserProgress = async (req, res) => {
  const jwt = req.user && req.user.token;
  const userId = req.user && (req.user.id || req.user.sub);
  if (!jwt || !userId) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
  }
  try {
    const supabase = getUserSupabaseClient(jwt);
    // Fetch from optimized view
    const { data, error } = await supabase
      .from('user_progress_view')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (error) throw error;
    // Optionally, fetch recent activities for insights
    const { data: recent_activities, error: actErr } = await supabase
      .from('activities')
      .select('type, duration, calories, date')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(2);
    if (actErr) throw actErr;
    // Insights logic (can be further optimized)
    let insights = [];
    if (data.workouts_completed > 0 && data.activity_days >= 7) {
      insights.push('Great job! You have a 7-day activity streak. Keep it up!');
    }
    if (data.total_calories > 10000) {
      insights.push('You have burned over 10,000 calories. Amazing progress!');
    }
    if (data.goals_achieved > 0) {
      insights.push(`You have achieved ${data.goals_achieved} fitness goal${data.goals_achieved > 1 ? 's' : ''}.`);
    }
    return res.status(200).json({
      success: true,
      data: {
        workouts_completed: data.workouts_completed,
        total_calories: data.total_calories,
        activity_days: data.activity_days,
        goals_achieved: data.goals_achieved,
        last_activity_date: data.last_activity_date,
        recent_activities: recent_activities || [],
        insights
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Failed to aggregate progress', details: err.message } });
  }
};
