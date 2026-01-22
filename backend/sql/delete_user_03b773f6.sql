-- Delete specific user from auth.users
-- This will cascade to profiles, activities, and fitness_goals if foreign keys are set up correctly
DELETE FROM auth.users WHERE id = '03b773f6-b584-44ce-bcf2-16c2afeef5dd';
