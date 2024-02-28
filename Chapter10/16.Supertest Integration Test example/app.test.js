// app.test.js
const request = require('supertest');
const app = require('./app'); // Assuming your app is in the same directory

test('GET /api/resource returns 200', async () => {
  const response = await request(app).get('/api/resource');
  expect(response.status).toBe(200);
});
