// users.js
var userController = require('./userController');

module.exports = function(app) {
  app.post('/users/signup', userController.signup);
  app.post('/user/login', userController.login);
  app.get('/user/:id', userController.getUser);
  app.post('/user/:id', userController.updateUser);
  app.get('/users/:id/reviews', userController.getReview);
  app.post('/users/:id/reviews', userController.postReview);
};
