const { supabaseClient, supabaseAdmin } = require('../config/supabase-client');
const { createClient } = require('@supabase/supabase-js');

// Helper to get a client with the user's JWT (for RLS)
function getUserSupabaseClient(jwt) {
  // Use the 'global' option for v2, or 'headers' for v1
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${jwt}`,
          apikey: process.env.SUPABASE_ANON_KEY,
          'Content-Type': 'application/json'
        }
      }
    }
  );
}

// List all workouts
exports.getAllWorkouts = async (req, res) => {
  try {
    const jwt = req.user && req.user.token;
    const userId = req.user && req.user.sub;
    console.log('getAllWorkouts: userId (from req.user.sub):', userId);
    console.log('getAllWorkouts: JWT (first 32 chars):', jwt && jwt.substring(0, 32));
    if (!jwt) {
      return res.status(401).json({ success: false, error: 'Unauthorized: JWT missing' });
    }
    const userSupabase = getUserSupabaseClient(jwt);
    const { data, error } = await userSupabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create a new workout
exports.createWorkout = async (req, res) => {
  try {
    const { name, description, duration, difficulty } = req.body;
    if (!name || !description || !duration || !difficulty) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    // Always get user_id from req.user.sub for RLS
    const userId = req.user && req.user.sub;
    const jwt = req.user && req.user.token;
    console.log('createWorkout: userId (from req.user.sub):', userId);
    console.log('createWorkout: JWT (first 32 chars):', jwt && jwt.substring(0, 32));
    if (!userId || !jwt) {
      return res.status(401).json({ success: false, error: 'Unauthorized: user_id or JWT missing' });
    }
    const workoutObj = {
      user_id: userId,
      name,
      description,
      duration,
      difficulty,
    };
    console.log('Workout object to insert:', workoutObj);
    const userSupabase = getUserSupabaseClient(jwt);
    // Debug: print outgoing headers
    if (userSupabase && userSupabase.rest && userSupabase.rest.fetch) {
      const originalFetch = userSupabase.rest.fetch;
      userSupabase.rest.fetch = async (url, options) => {
        console.log('Supabase outgoing request headers:', options && options.headers);
        if (options && options.body) {
          try {
            console.log('Supabase outgoing request body:', JSON.parse(options.body));
          } catch (e) {
            console.log('Supabase outgoing request body (raw):', options.body);
          }
        }
        return originalFetch(url, options);
      };
    }
    const { data, error } = await userSupabase
      .from('workouts')
      .insert([workoutObj])
      .select()
      .single();
    if (error) {
      console.error('Supabase error object:', error);
      throw error;
    }
    // Immediately query the inserted row for verification
    const { data: verifyData, error: verifyError } = await userSupabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .eq('name', name)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (verifyError) {
      console.error('Verification query error:', verifyError);
    } else {
      console.log('Verification query result:', verifyData);
    }
    res.status(201).json({ success: true, data, verify: verifyData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, details: err });
  }
};

// Get a workout by ID
exports.getWorkoutById = async (req, res) => {
  try {
    const jwt = req.user && req.user.token;
    const userId = req.user && req.user.sub;
    const workoutId = req.params.id;
    if (!jwt || !userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized: JWT or userId missing' });
    }
    const userSupabase = getUserSupabaseClient(jwt);
    const { data, error } = await userSupabase
      .from('workouts')
      .select('*')
      .eq('id', workoutId)
      .eq('user_id', userId)
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, error: 'Workout not found' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update a workout by ID
exports.updateWorkoutById = async (req, res) => {
  try {
    const jwt = req.user && req.user.token;
    const userId = req.user && req.user.sub;
    const workoutId = req.params.id;
    const { name, description, duration, difficulty } = req.body;
    if (!jwt || !userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized: JWT or userId missing' });
    }
    const userSupabase = getUserSupabaseClient(jwt);
    const { data, error } = await userSupabase
      .from('workouts')
      .update({ name, description, duration, difficulty })
      .eq('id', workoutId)
      .eq('user_id', userId)
      .select()
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, error: 'Workout not found or not updated' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a workout by ID
exports.deleteWorkoutById = async (req, res) => {
  try {
    const jwt = req.user && req.user.token;
    const userId = req.user && req.user.sub;
    const workoutId = req.params.id;
    if (!jwt || !userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized: JWT or userId missing' });
    }
    const userSupabase = getUserSupabaseClient(jwt);
    const { data, error } = await userSupabase
      .from('workouts')
      .delete()
      .eq('id', workoutId)
      .eq('user_id', userId)
      .select()
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, error: 'Workout not found or not deleted' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get recommended workouts based on user's primary fitness goal and preferred workout type
exports.getRecommendedWorkouts = async (req, res) => {
  try {
    const jwt = req.user && req.user.token;
    const userId = req.user && req.user.sub;
    if (!jwt || !userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized: JWT or userId missing' });
    }
    const userSupabase = getUserSupabaseClient(jwt);

    // 1. Fetch user's primary fitness goal
    const { data: goals, error: goalError } = await userSupabase
      .from('fitness_goals')
      .select('"Goal"') // Use quoted capital G to match Supabase
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (goalError) {
      console.error('Error fetching fitness goal:', goalError.message);
      return res.status(500).json({ success: false, error: 'Failed to retrieve fitness goal.' });
    }

    if (!goals || goals.length === 0) {
      return res.status(404).json({ success: false, error: 'No fitness goal found for user' });
    }
    
    // 2. Fetch all workouts. Filtering by goal is not supported by the current schema.
    const { data: workouts, error: workoutError } = await userSupabase.from('workouts').select('*');

    if (workoutError) {
      console.error('Error fetching workouts:', workoutError.message);
      return res.status(500).json({ success: false, error: 'Failed to retrieve workouts.' });
    }

    res.json({ success: true, data: workouts });
  } catch (err) {
    // Generic catch block for any other unexpected errors
    res.status(500).json({ success: false, error: err.message });
  }
};
