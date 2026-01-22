-- Add basic info fields to profiles table (for OnboardingScreen1 data)
-- Run this in your Supabase SQL Editor

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS height TEXT,
ADD COLUMN IF NOT EXISTS weight TEXT;

-- Optional: Add constraints if needed
-- ALTER TABLE profiles ADD CONSTRAINT gender_check CHECK (gender IN ('male', 'female'));
