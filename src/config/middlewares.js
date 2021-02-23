const parser = require('body-parser');

module.exports = (app) => {
  app.use(parser.json());
}