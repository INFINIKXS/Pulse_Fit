# Fitness Goals API Documentation

## Authentication
All endpoints require a valid JWT in the `Authorization` header:

```
Authorization: Bearer <JWT>
```

---

## Create a Goal

**POST** `/api/users/me/goals`

**Body (JSON):**
```json
{
  "goal_type": "string",         // e.g. "weight_loss"
  "target_value": number,        // e.g. 10
  "start_date": "YYYY-MM-DD",    // optional, defaults to today
  "end_date": "YYYY-MM-DD"       // optional, defaults to 30 days from today
}
```

**Response:**
- `201 Created` with created goal object
- `400 Bad Request` on validation error

---

## List All Goals

**GET** `/api/users/me/goals`

**Response:**
- `200 OK` with `{ "goals": [ ... ] }`
- `401 Unauthorized` if not logged in

---

## Update a Goal

**PUT** `/api/users/me/goals/:id`

**Body (JSON):**
```json
{
  "goal_type": "string",      // optional
  "target_value": number,     // optional
  "start_date": "YYYY-MM-DD", // optional
  "end_date": "YYYY-MM-DD"    // optional
}
```
- Only include fields you want to update.

**Response:**
- `200 OK` with updated goal object or "Goal already up to date"
- `404 Not Found` if goal does not exist or does not belong to user

---

## Delete a Goal

**DELETE** `/api/users/me/goals/:id`

**Response:**
- `200 OK` with `{ "message": "Goal deleted" }`
- `404 Not Found` if goal does not exist or does not belong to user

---

## Get User Progress

**GET** `/api/users/me/progress`

**Description:**
Returns aggregated progress metrics and insights for the authenticated user. This includes:
- Total workouts completed
- Total calories burned
- Number of active days
- Number of goals achieved
- Date of last activity
- Recent activities (last 2)
- Dynamic insights based on user progress

**Authentication:**
Requires a valid JWT in the `Authorization` header:
```
Authorization: Bearer <JWT>
```

**Response:**
- `200 OK` with progress metrics and insights object
- `401 Unauthorized` if not logged in or JWT is invalid
- `500 Internal Server Error` on aggregation failure

**Response Schema:**
```json
{
  "success": true,
  "data": {
    "workouts_completed": 42,
    "total_calories": 12345,
    "activity_days": 14,
    "goals_achieved": 3,
    "last_activity_date": "2025-06-23",
    "recent_activities": [
      { "type": "run", "duration": 30, "calories": 300, "date": "2025-06-23" },
      { "type": "cycle", "duration": 45, "calories": 400, "date": "2025-06-22" }
    ],
    "insights": [
      "Great job! You have a 7-day activity streak. Keep it up!",
      "You have burned over 10,000 calories. Amazing progress!",
      "You have achieved 3 fitness goals."
    ]
  }
}
```

**Error Response Example:**
```json
{
  "success": false,
  "error": {
    "message": "Failed to aggregate progress",
    "details": "<error details>"
  }
}
```

---

## Error Responses

All error responses are JSON:
```json
{
  "error": "Error message",
  "details": "Optional details"
}
```

---
