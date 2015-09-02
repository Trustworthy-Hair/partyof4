// users.js
var userController = require('../controllers/users');

module.exports = function(app) {
  app.post('/users/signup', userController.signup);
  app.post('/users/login', userController.login);
  app.get('/users/logout', userController.logout);

  app.get('/users/:userId', userController.getUser);
  app.post('/users/:userId', userController.updateUser);

  app.get('/users/:id/reviews', userController.getReviews);
  app.post('/users/:id/reviews', userController.postReview);


  app.get('/users/:id/history', userController.getHistory);
  app.post('/users/:id/history', userController.updateHistory);

};
