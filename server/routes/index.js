var users_route = require('./users')


module.exports = function (app) {
  app.use('/users', users_route);
};