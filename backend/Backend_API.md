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
Returns aggregated progress metrics for the authenticated user, including workouts completed, total calories burned, activity streaks, and other relevant fitness data.

**Response:**
- `200 OK` with progress metrics object
- `401 Unauthorized` if not logged in

**Example Response:**
```json
{
  "success": true,
  "data": {
    "workouts_completed": 42,
    "total_calories": 12345,
    "activity_streak": 7,
    "goals_achieved": 3,
    "last_activity_date": "2025-06-23",
    "recent_activities": [
      { "type": "run", "duration": 30, "calories": 300, "date": "2025-06-23" },
      { "type": "cycle", "duration": 45, "calories": 400, "date": "2025-06-22" }
    ]
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
