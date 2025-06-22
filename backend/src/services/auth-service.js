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
    console.log('Supabase Auth userId:', userId);
    if (!userId) {
      // Fallback: fetch user by email using admin client
      const { data: userData, error: fetchError } = await supabaseAdmin.auth.admin.listUsers({ email });
      if (fetchError || !userData.users || userData.users.length === 0) {
        console.error('User creation failed or user not found after signUp:', fetchError);
        throw new Error('User creation failed');
      }
      userId = userData.users[0].id;
      console.log('Fetched userId from admin:', userId);
    }
    // Automatically create profile in profiles table with provided details
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([{ id: userId, full_name, age }]);
    if (profileError) {
      console.error('Profile creation error:', profileError.message, profileError.details);
      throw new Error(profileError.message);
    }
    console.log('Profile created:', profileData);
    // Insert into custom users table (public.users)
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: userInsertData, error: userTableError } = await supabaseAdmin
      .from('users')
      .insert([{ id: userId, email, password: hashedPassword }]);
    if (userTableError) {
      console.error('Custom users table insert error:', userTableError.message, userTableError.details);
      throw new Error(userTableError.message);
    }
    console.log('User inserted into custom users table:', userInsertData);
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
