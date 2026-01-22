-- Rename tag columns to match frontend field names
-- Run this in your Supabase SQL Editor

-- Step 1: Rename existing columns with data
ALTER TABLE profiles RENAME COLUMN fitness_goal_tags TO fitness_goals;
ALTER TABLE profiles RENAME COLUMN mental_wellness_tags TO mental_wellness_goals;

-- Step 2: (Optional) If you had an empty fitness_goals column, drop it first then rename
-- If you get an error that fitness_goals already exists, run these instead:
-- ALTER TABLE profiles DROP COLUMN IF EXISTS fitness_goals;
-- ALTER TABLE profiles DROP COLUMN IF EXISTS mental_wellness_goals;
-- ALTER TABLE profiles RENAME COLUMN fitness_goal_tags TO fitness_goals;
-- ALTER TABLE profiles RENAME COLUMN mental_wellness_tags TO mental_wellness_goals;
