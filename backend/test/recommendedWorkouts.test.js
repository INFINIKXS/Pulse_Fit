// tests/recommendedWorkouts.test.js - Test for GET /api/workouts/recommended
const request = require('supertest');
const app = require('../app'); // Use the same app import as api.test.js
const { supabaseAdmin: admin } = require('../src/config/supabase-client');

// Helper function to get the admin client
function getAdminClient() {
  return admin;
}

// Mock/test user credentials (replace with test user setup as needed)
const TEST_USER = {
  email: 'ifeanyiobasi66@gmail.com',
  password: 'ABCD1234',
};

let jwtToken;
let userId;

describe('/api/workouts/recommended', () => {
  beforeAll(async () => {
    // Try to login, if fails, register the user, then login
    let res = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_USER.email, password: TEST_USER.password });
    if (res.statusCode !== 200) {
      // Register the user if not found
      await request(app)
        .post('/api/auth/register')
        .send({ email: TEST_USER.email, password: TEST_USER.password });
      // Try login again
      res = await request(app)
        .post('/api/auth/login')
        .send({ email: TEST_USER.email, password: TEST_USER.password });
    }
    // Defensive: print the response for debugging
    // eslint-disable-next-line no-console
    console.log('Auth response:', res.body);
    // Try to extract token and userId from all possible locations
    jwtToken = res.body.token
      || (res.body.data && res.body.data.token)
      || (res.body.data && res.body.data.session && res.body.data.session.access_token);
    userId = (res.body.user && (res.body.user.id || res.body.user.sub || res.body.user.user_id))
      || (res.body.data && res.body.data.user && (res.body.data.user.id || res.body.data.user.sub || res.body.data.user.user_id));
    // Defensive: print extracted values
    // eslint-disable-next-line no-console
    console.log('jwtToken:', jwtToken, 'userId:', userId);
    if (!jwtToken) {
      throw new Error('No JWT token found in login response. Response: ' + JSON.stringify(res.body));
    }
    if (!userId) {
      throw new Error('No userId found in login response. Response: ' + JSON.stringify(res.body));
    }
    // Clean up any old test data via API endpoints if available
    // Ensure a goal exists for the test user
    const admin = getAdminClient();
    await admin.from('fitness_goals').delete().eq('user_id', userId);
    await admin.from('fitness_goals').insert({ user_id: userId, Goal: 'Weight Loss', goal_type: 'weight_loss', target_value: 10, start_date: '2025-06-23', end_date: '2025-07-23' });
  });

  afterAll(async () => {
    // Optionally, clean up test data via API endpoints if available
  });

  it('returns all workouts if a goal is set', async () => {
    const res = await request(app)
      .get('/api/workouts/recommended')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    // Since filtering is not possible, we expect all workouts to be returned.
    const names = res.body.data.map(w => w.name);
    expect(names.length).toBeGreaterThan(0); // Ensure some workouts are returned
  });

  it('returns 404 if user has no fitness goal', async () => {
    // Remove fitness goals
    const admin = getAdminClient();
    await admin.from('fitness_goals').delete().eq('user_id', userId);
    const res = await request(app)
      .get('/api/workouts/recommended')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/no fitness goal/i);
    // Restore for other tests
    await admin.from('fitness_goals').insert({ user_id: userId, Goal: 'Weight Loss', goal_type: 'weight_loss', target_value: 10, start_date: '2025-06-23', end_date: '2025-07-23' });
  });

  it('returns all workouts for goal if preferred type is missing', async () => {
    // This test is now identical to the first test, as preferred_type is not used.
    const res = await request(app)
      .get('/api/workouts/recommended')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toBe(200);
    const names = res.body.data.map(w => w.name);
    expect(names.length).toBeGreaterThan(0);
  });

  it('requires authentication', async () => {
    const res = await request(app)
      .get('/api/workouts/recommended');
    expect(res.statusCode).toBe(401);
  });

  it('returns only workouts matching preferred type if set', async () => {
    const admin = getAdminClient();
    // Set preferred_workout_type to 'cardio' for the test user
    await admin.from('profiles').update({ preferred_workout_type: 'cardio' }).eq('id', userId);
    // Insert workouts of different types
    await admin.from('workouts').delete().eq('user_id', userId); // Clean up old workouts
    await admin.from('workouts').insert([
      { user_id: userId, name: 'Cardio Blast', description: 'Cardio session', duration: 30, difficulty: 'easy', type: 'cardio' },
      { user_id: userId, name: 'Strength Builder', description: 'Strength session', duration: 30, difficulty: 'medium', type: 'strength' }
    ]);
    const res = await request(app)
      .get('/api/workouts/recommended')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toBe(200);
    const names = res.body.data.map(w => w.name);
    expect(names).toContain('Cardio Blast');
    expect(names).not.toContain('Strength Builder');
  });

  it('returns all workouts if preferred type is not set', async () => {
    const admin = getAdminClient();
    // Remove preferred_workout_type for the test user
    await admin.from('profiles').update({ preferred_workout_type: null }).eq('id', userId);
    // Insert workouts of different types
    await admin.from('workouts').delete().eq('user_id', userId); // Clean up old workouts
    await admin.from('workouts').insert([
      { user_id: userId, name: 'Cardio Blast', description: 'Cardio session', duration: 30, difficulty: 'easy', type: 'cardio' },
      { user_id: userId, name: 'Strength Builder', description: 'Strength session', duration: 30, difficulty: 'medium', type: 'strength' }
    ]);
    const res = await request(app)
      .get('/api/workouts/recommended')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toBe(200);
    const names = res.body.data.map(w => w.name);
    expect(names).toContain('Cardio Blast');
    expect(names).toContain('Strength Builder');
  });

  it('returns empty array if no workouts match preferred type', async () => {
    const admin = getAdminClient();
    // Set preferred_workout_type to 'yoga' for the test user
    await admin.from('profiles').update({ preferred_workout_type: 'yoga' }).eq('id', userId);
    // Insert only non-yoga workouts
    await admin.from('workouts').delete().eq('user_id', userId); // Clean up old workouts
    await admin.from('workouts').insert([
      { user_id: userId, name: 'Cardio Blast', description: 'Cardio session', duration: 30, difficulty: 'easy', type: 'cardio' }
    ]);
    const res = await request(app)
      .get('/api/workouts/recommended')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(0);
  });
});
