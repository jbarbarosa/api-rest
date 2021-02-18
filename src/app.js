const parser = require('body-parser')
const app = require('express')();

app.use(parser.json())

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/users', (req, res) => {
  const users = [{
    name: 'Joao',
    mail: 'joao@email',
  }];
  res.status(200).json(users);
});

app.post('/users', (req, res) => {
	res.status(201).json(req.body);
});

module.exports = app;
