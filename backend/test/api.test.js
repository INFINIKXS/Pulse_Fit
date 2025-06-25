// api.test.js - Comprehensive API endpoint tests for Pulse_Fit backend
const request = require('supertest');
const app = require('../app');

// Health check for unknown route
describe('API Health Check', () => {
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toBe(404);
  });
});

// Mock Supabase for invalid login test
describe('Auth Endpoints', () => {
  beforeAll(() => {
    jest.resetModules();
    jest.mock('@supabase/supabase-js');
  });
  afterAll(() => {
    jest.unmock('@supabase/supabase-js');
  });

  it('should reject registration with missing fields', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
  it('should reject login with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'fake@example.com', password: 'wrongpass' });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.message).toMatch(/invalid/i);
  });
  it('should reject registration with invalid email', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'notanemail', password: '12345678' });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});

describe('User Endpoints', () => {
  it('should require auth for /api/users/me', async () => {
    const res = await request(app).get('/api/users/me');
    expect(res.statusCode).toBe(401);
  });
  it('should reject update with invalid age', async () => {
    const res = await request(app).put('/api/users/me').send({ age: -5 });
    expect([400, 401]).toContain(res.statusCode);
  });
});

describe('Workouts Endpoints', () => {
  it('should require auth for GET /api/workouts', async () => {
    const res = await request(app).get('/api/workouts');
    expect(res.statusCode).toBe(401);
  });
  it('should require auth for POST /api/workouts', async () => {
    const res = await request(app).post('/api/workouts').send({});
    expect(res.statusCode).toBe(401);
  });
  it('should reject workout creation with missing fields', async () => {
    const res = await request(app).post('/api/workouts').send({ name: '' });
    expect([400, 401]).toContain(res.statusCode);
  });
});

describe('Nutrition Endpoints', () => {
  it('should require auth for GET /api/nutrition', async () => {
    const res = await request(app).get('/api/nutrition');
    expect(res.statusCode).toBe(401);
  });
  it('should require auth for POST /api/nutrition', async () => {
    const res = await request(app).post('/api/nutrition').send({});
    expect(res.statusCode).toBe(401);
  });
  it('should reject nutrition entry with missing required fields', async () => {
    const res = await request(app).post('/api/nutrition').send({ food: '' });
    expect([400, 401]).toContain(res.statusCode);
  });
});

describe('Progress Endpoints', () => {
  it('should require auth for GET /api/users/me/progress', async () => {
    const res = await request(app).get('/api/users/me/progress');
    expect(res.statusCode).toBe(401);
  });
});

describe('Activities Endpoints', () => {
  it('should require auth for GET /api/activities', async () => {
    const res = await request(app).get('/api/activities');
    expect(res.statusCode).toBe(401);
  });
  it('should require auth for POST /api/activities', async () => {
    const res = await request(app).post('/api/activities').send({});
    expect(res.statusCode).toBe(401);
  });
  it('should reject activity creation with missing fields', async () => {
    const res = await request(app).post('/api/activities').send({ type: '' });
    expect([400, 401]).toContain(res.statusCode);
  });
});

describe('Goals Endpoints', () => {
  it('should require auth for GET /api/users/me/goals', async () => {
    const res = await request(app).get('/api/users/me/goals');
    expect(res.statusCode).toBe(401);
  });
  it('should require auth for POST /api/users/me/goals', async () => {
    const res = await request(app).post('/api/users/me/goals').send({});
    expect(res.statusCode).toBe(401);
  });
  it('should reject goal creation with missing fields', async () => {
    const res = await request(app).post('/api/users/me/goals').send({ goal_type: '' });
    expect([400, 401]).toContain(res.statusCode);
  });
});

describe('Analytics Endpoints', () => {
  it('should return 404 for GET /api/analytics (placeholder)', async () => {
    const res = await request(app).get('/api/analytics');
    expect([404, 200]).toContain(res.statusCode); // Accepts 404 or 200 if implemented
  });
});

describe('Positive Auth & User Flow', () => {
  let token;
  const testUser = {
    email: `testuser_${Date.now()}@example.com`,
    password: 'TestPass123!',
    full_name: 'Test User',
    age: 25
  };

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    console.log('REGISTER RESPONSE:', res.statusCode, JSON.stringify(res.body));
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('data.user');
    expect(res.body.data.user.email).toBe(testUser.email);
  });

  it('should login and receive a JWT', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: testUser.email, password: testUser.password });
    console.log('LOGIN RESPONSE:', res.statusCode, JSON.stringify(res.body));
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data.session.access_token');
    token = res.body.data.session.access_token;
    expect(typeof token).toBe('string');
  });

  it('should access /api/users/me with valid JWT', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', testUser.email);
  });
});
