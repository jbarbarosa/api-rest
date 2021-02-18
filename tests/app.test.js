const request = require('supertest');
const app = require('../src/app.js');

test('Responder na raíz', () => {
  return request(app).get('/')
    .then((res) => {
      expect(res.status).toBe(200);
    });
});
