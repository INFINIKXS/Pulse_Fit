// ...boilerplate for service...
const { supabaseAdmin, supabaseClient } = require('../config/supabase-client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async register({ email, password, full_name, age }) {
    // Create user using Supabase client to trigger verification email
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password
    });
    if (error) throw new Error(error.message);
    let userId = data.user && data.user.id;
    if (!userId) {
      // Fallback: fetch user by email using admin client
      const { data: userData, error: fetchError } = await supabaseAdmin.auth.admin.listUsers({ email });
      if (fetchError || !userData.users || userData.users.length === 0) throw new Error('User creation failed');
      userId = userData.users[0].id;
    }
    // Automatically create profile in profiles table with provided details
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([{ id: userId, full_name, age }]);
    if (profileError) {
      console.error('Profile creation error:', profileError.message);
      throw new Error(profileError.message);
    }
    return { user: { id: userId, email, full_name, age } };
  },

  async login({ email, password }) {
    // Sign in user with Supabase Auth
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw new Error(error.message);
    // Generate JWT (if needed, or use Supabase's)
    // ...
    return { user: data.user, session: data.session };
  }
};
