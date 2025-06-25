// __mocks__/@supabase/supabase-js.js
module.exports = {
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(({ email, password }) => {
        // Simulate invalid credentials
        if (email === 'fake@example.com' && password === 'wrongpass') {
          return Promise.resolve({ data: null, error: { message: 'Invalid login credentials' } });
        }
        // Default: valid credentials
        return Promise.resolve({ data: { user: { id: 'mock-user', email }, session: {} }, error: null });
      }),
      signUp: jest.fn(() => Promise.resolve({ data: { user: { id: 'mock-user' } }, error: null })),
      admin: {
        listUsers: jest.fn(() => Promise.resolve({ data: { users: [{ id: 'mock-user' }] }, error: null }))
      }
    },
    from: jest.fn(() => ({
      insert: jest.fn(() => Promise.resolve({ data: [{}], error: null }))
    }))
  }))
};
