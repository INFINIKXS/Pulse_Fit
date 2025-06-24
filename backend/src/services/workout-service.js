const { supabaseClient } = require('../config/supabase-client');

/**
 * Fetch all workouts from the database.
 * @returns {Promise<{ data: any[], error: any }>} List of workouts or error
 */
async function getAllWorkouts() {
  const { data, error } = await supabaseClient
    .from('workouts')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

/**
 * Create a new workout in the database.
 * @param {Object} workout - Workout data
 * @returns {Promise<{ data: any, error: any }>}
 */
async function createWorkout(workout) {
  const { data, error } = await supabaseClient
    .from('workouts')
    .insert([workout])
    .select()
    .single();
  return { data, error };
}

module.exports = {
  getAllWorkouts,
  createWorkout,
};
