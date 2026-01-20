// src/config/supabase-client.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Admin client (for server-side operations)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Standard client with anon key (for auth operations like signUp)
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Factory for RLS-compliant user client
function getUserSupabaseClient(jwt) {
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      global: {
        headers: {
          Authorization: `Bearer ${jwt}`,
          apikey: supabaseAnonKey,
          'Content-Type': 'application/json',
        },
      },
    }
  );
}

module.exports = { supabaseAdmin, supabaseClient, getUserSupabaseClient };
