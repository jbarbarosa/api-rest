const request = require('supertest');
const app = require('../src/app');

test('Listar todos os usuários', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('name', 'Joao')
    });
});

test('Inserir novo usuário', () => {
  return request(app).post('/users')
    .send({
      name: 'Walter Mitty',
      mail: 'waltermitty@fantasy.com'
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Walter Mitty');
    });
});