-- SQL: Create or replace a view for user progress aggregation
CREATE OR REPLACE VIEW user_progress_view AS
SELECT
  u.id AS user_id,
  COUNT(DISTINCT w.id) AS workouts_completed,
  COALESCE(SUM(w.calories), 0) + COALESCE(SUM(a.calories), 0) AS total_calories,
  (
    SELECT COUNT(*) FROM (
      SELECT DISTINCT a2.date::date
      FROM activities a2
      WHERE a2.user_id = u.id
    ) AS unique_days
  ) AS activity_days,
  (
    SELECT MAX(a3.date) FROM activities a3 WHERE a3.user_id = u.id
  ) AS last_activity_date,
  (
    SELECT COUNT(*) FROM fitness_goals g WHERE g.user_id = u.id AND g.achieved = TRUE
  ) AS goals_achieved
FROM users u
LEFT JOIN workouts w ON w.user_id = u.id
LEFT JOIN activities a ON a.user_id = u.id
GROUP BY u.id;
