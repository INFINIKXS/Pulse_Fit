-- Remove redundant users table and point foreign keys to auth.users
-- Run this in your Supabase SQL Editor

-- Step 1: Drop existing foreign keys from public.users
ALTER TABLE activities DROP CONSTRAINT IF EXISTS activities_user_id_fkey;
ALTER TABLE fitness_goals DROP CONSTRAINT IF EXISTS fitness_goals_user_id_fkey;

-- Step 2: Drop the view that depends on users table
DROP VIEW IF EXISTS user_progress_view;

-- Step 3: Drop the redundant users table
DROP TABLE IF EXISTS users;

-- Step 4: Add new foreign keys pointing to auth.users
ALTER TABLE activities 
ADD CONSTRAINT activities_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE fitness_goals 
ADD CONSTRAINT fitness_goals_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Done! Your architecture is now:
-- auth.users -> handles authentication (Supabase managed)
-- profiles -> stores user profile data (linked via id)
-- activities/fitness_goals -> reference auth.users(id) directly
