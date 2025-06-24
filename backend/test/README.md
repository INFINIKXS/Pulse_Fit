# Fitness Activities API Test Scripts

This directory contains PowerShell scripts for testing the CRUD endpoints of the Fitness Activities API. Each script authenticates with Supabase, prompts for required input, and makes a request to the local backend server.

## Prerequisites
- Node.js backend server running on `http://localhost:4000`
- Supabase project with correct environment variables in `backend/.env`
- Test user credentials (update email/password in scripts as needed)

## Scripts Overview

### 1. post-activity.ps1
- **Purpose:** Create a new activity
- **Usage:** `./post-activity.ps1`
- **Prompts:** None (edit script to change activity data)
- **Request:** `POST /api/activities`

### 2. get-activities.ps1
- **Purpose:** List all activities for the authenticated user
- **Usage:** `./get-activities.ps1`
- **Prompts:** None
- **Request:** `GET /api/activities`

### 3. get-activity.ps1
- **Purpose:** Fetch a single activity by ID
- **Usage:** `./get-activity.ps1`
- **Prompts:** ActivityId (entered at runtime)
- **Request:** `GET /api/activities/:id`

### 4. put-activity.ps1
- **Purpose:** Update an activity by ID
- **Usage:** `./put-activity.ps1`
- **Prompts:** ActivityId (entered at runtime)
- **Request:** `PUT /api/activities/:id`
- **Note:** Edit script to change update data

### 5. delete-activity.ps1
- **Purpose:** Delete an activity by ID
- **Usage:** `./delete-activity.ps1`
- **Prompts:** ActivityId (entered at runtime)
- **Request:** `DELETE /api/activities/:id`

## Common Script Features
- Loads Supabase credentials from `backend/.env`
- Logs in with test user to obtain JWT
- Uses JWT for all API requests
- Prompts for ActivityId where required
- Outputs API response as formatted JSON

## Example Workflow
1. Run `post-activity.ps1` to create an activity. Note the returned ID.
2. Use the ID with `get-activity.ps1`, `put-activity.ps1`, and `delete-activity.ps1` to test retrieval, update, and deletion.
3. Use `get-activities.ps1` to list all activities for the user.

## Troubleshooting
- Ensure the backend server is running and accessible at `http://localhost:4000`.
- Make sure the `.env` file contains valid Supabase credentials.
- Update the test user email/password in scripts if needed.
- If you see errors about missing columns, update your Supabase table schema as described in the project setup.

## Customization
- Edit the `$body` variable in `post-activity.ps1` and `put-activity.ps1` to test different activity data.
- Add more fields or validation as your API evolves.

---

For further help, see the backend API documentation or contact the project maintainer.
