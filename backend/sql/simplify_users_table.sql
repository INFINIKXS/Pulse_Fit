-- Make password column optional in users table
-- Run this in your Supabase SQL Editor

-- Allow NULL values for password column (since auth.users handles authentication)
ALTER TABLE users ALTER COLUMN password DROP NOT NULL;

-- Or if you want to remove the password column entirely:
-- ALTER TABLE users DROP COLUMN IF EXISTS password;
