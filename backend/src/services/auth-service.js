// ...boilerplate for service...
const { supabaseAdmin, supabaseClient } = require('../config/supabase-client');
const jwt = require('jsonwebtoken');

/**
 * Retry wrapper for handling transient Supabase connection issues
 * @param {Function} operation - Async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} baseDelay - Base delay in ms (doubles each retry)
 */
async function withRetry(operation, maxRetries = 3, baseDelay = 1000) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const isRetryable =
        error.message?.includes('fetch failed') ||
        error.message?.includes('CONNECT_TIMEOUT') ||
        error.message?.includes('network') ||
        error.cause?.code === 'UND_ERR_CONNECT_TIMEOUT';

      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Supabase connection failed (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

module.exports = {
  async register({ email, password, full_name, age }) {
    // Create user using Supabase client to trigger verification email (with retry)
    const { data, error } = await withRetry(() =>
      supabaseClient.auth.signUp({ email, password })
    );
    if (error) throw new Error(error.message);
    let userId = data.user && data.user.id;
    console.log('Supabase Auth userId:', userId);
    if (!userId) {
      // Fallback: fetch user by email using admin client (with retry)
      const { data: userData, error: fetchError } = await withRetry(() =>
        supabaseAdmin.auth.admin.listUsers({ email })
      );
      if (fetchError || !userData.users || userData.users.length === 0) {
        console.error('User creation failed or user not found after signUp:', fetchError);
        throw new Error('User creation failed');
      }
      userId = userData.users[0].id;
      console.log('Fetched userId from admin:', userId);
    }
    // Create empty profile in profiles table - details will be added during onboarding (with retry)
    const { data: profileData, error: profileError } = await withRetry(() =>
      supabaseAdmin.from('profiles').insert([{ id: userId }])
    );
    if (profileError) {
      console.error('Profile creation error:', profileError.message, profileError.details);
      throw new Error(profileError.message);
    }
    console.log('Profile created:', profileData);
    console.log('Profile created:', profileData);

    // Return the Supabase session token if available (auto-login after signup)
    // If no session (e.g. email confirmation required), we can't return a valid token for getUser()
    const token = data.session?.access_token || null;

    if (!token && !data.user) {
      // Edge case: should have failed earlier, but if here without user/token
      throw new Error('Registration successful but no session returned. Please check email verification settings.');
    }

    // If we have a user but no token (email verification specific), frontend handles this
    return { token, user: { id: userId, email } };
  },

  async login({ email, password }) {
    console.log('Login attempt for:', email);
    // Sign in user with Supabase Auth (with retry)
    const { data, error } = await withRetry(() =>
      supabaseClient.auth.signInWithPassword({ email, password })
    );
    if (error) {
      console.log('Login failed:', error.message);
      throw new Error(error.message);
    }
    // Use the Supabase access token directly
    const token = data.session?.access_token;
    if (!token) {
      throw new Error('No access token returned from Supabase Auth.');
    }
    console.log('Login successful for user:', data.user?.id);

    // Fetch full user profile (with retry)
    const { data: profileData, error: profileError } = await withRetry(() =>
      supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()
    );

    // Generate signed URL for avatar if present
    let avatarSignedUrl = null;
    if (profileData?.avatar_url) {
      const { data: urlData } = await supabaseClient.storage
        .from('avatars')
        .createSignedUrl(profileData.avatar_url, 60 * 60); // 1 hour
      avatarSignedUrl = urlData?.signedUrl || null;
    }

    const profile = profileData || {};
    console.log('Profile query result:', profile);

    return {
      token, // <-- Valid Supabase JWT
      user: {
        ...data.user,
        ...profile,
        avatar_signed_url: avatarSignedUrl
      },
      session: data.session
    };
  }
};
