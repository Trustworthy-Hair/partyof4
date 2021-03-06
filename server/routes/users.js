// users.js
var userController = require('../controllers/users');

module.exports = function(app) {
  app.post('/users/signup', userController.signup);
  app.post('/users/login', userController.login);
  app.get('/users/logout', userController.logout);

  app.get('/users/:userId', userController.getUser);
  app.post('/users/:userId', userController.updateUser);

};
 