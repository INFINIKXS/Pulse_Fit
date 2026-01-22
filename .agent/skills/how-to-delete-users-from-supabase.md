---
description: How to delete users from Supabase when the dashboard fails
---

# How to Delete Users from Supabase

## Problem

The Supabase Dashboard UI may fail to delete users with the error:
> "Failed to delete user: Database error deleting user"

This typically happens due to foreign key constraints or dashboard bugs.

## Solution: Use SQL Editor

### Step 1: Delete from Custom Tables First (Optional but Recommended)

If you have custom tables like `profiles` or `users` referencing `auth.users`:

```sql
-- Delete from your custom tables first
DELETE FROM public.users WHERE id = 'USER_ID_HERE';
DELETE FROM public.profiles WHERE id = 'USER_ID_HERE';
```

### Step 2: Delete from auth.users Directly

Use the SQL Editor to delete directly from `auth.users`:

```sql
-- Single user
DELETE FROM auth.users WHERE id = 'USER_ID_HERE';

-- Or by email
DELETE FROM auth.users WHERE email = 'user@example.com';

-- Multiple users at once
DELETE FROM auth.users 
WHERE id IN (
  'uuid-1-here',
  'uuid-2-here',
  'uuid-3-here'
);
```

## Why SQL Works but Dashboard Doesn't

The Supabase Dashboard deletion uses the Auth Admin API which has additional checks and error handling that can be overly cautious. The SQL Editor runs queries directly against the database with full privileges, bypassing these API-level restrictions.

Common reasons the dashboard fails:

1. **Orphaned references** - The API checks for related data more strictly
2. **Timeout issues** - API has shorter timeouts than direct SQL
3. **Dashboard bugs** - The UI sometimes has known issues with batch deletions
4. **RLS policies** - Row Level Security may interfere with API calls

## Pro Tip: Add CASCADE to Foreign Keys

To make future deletions easier, add `ON DELETE CASCADE` to your foreign key constraints:

```sql
ALTER TABLE public.profiles 
DROP CONSTRAINT profiles_id_fkey,
ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
```

This automatically deletes related rows when the `auth.users` entry is deleted.
