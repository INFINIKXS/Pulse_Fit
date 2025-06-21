// ...boilerplate for service...
const { supabaseAdmin } = require('../config/supabase-client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async register({ email, password }) {
    // Create user in Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password
    });
    if (error) throw new Error(error.message);
    // Optionally, hash password and store in users table for custom fields
    // ...
    return { user: data.user };
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
