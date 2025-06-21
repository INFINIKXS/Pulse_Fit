// src/config/supabase-client.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Admin client (for server-side operations)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// User client (for RLS-respecting operations)
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabaseAdmin, supabaseClient };
