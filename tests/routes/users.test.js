const request = require('supertest');
const app = require('../../src/app.js');

test('Listar todos os usuários', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

const mail = `${Date.now()}@mail.com`;

test('Inserir novo usuário', () => {
  return request(app).post('/users')
    .send({
      name: 'Walter Mitty',
      mail,
      password: 'password',
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Walter Mitty');
    });
});

test('Não inserir usuário sem nome', () => {
  return request(app).post('/users')
    .send({
      mail,
      password: 'password',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório')
    });
});

test('Não inserir usuário sem e-mail', async () => {
  const result = await request(app).post('/users')
    .send({
      name: 'Walter Mitty',
      password: 'password',
    });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('E-mail é um atributo obrigatório');
});

test('Não inserir usuário sem senha', (done) => {
  request(app).post('/users')
    .send({
      name: 'Walter Mitty',
      mail: 'mittys@email.com',
    })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Senha é um atributo obrigatório');
      done();
    })
    .catch((err) => done.fail(err));
});

test('Não inserir um usuário com e-mail já cadastrado', () => {
  return request(app).post('/users')
    .send({
      name: 'Walter Mitty',
      mail,
      password: 'password',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe um usuário com este e-mail');
    });
});
