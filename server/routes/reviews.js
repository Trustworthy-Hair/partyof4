//reviews.js
var reviewController = require('../controllers/reviews');

module.exports = function(app){
  app.get('/users/:id/reviews', reviewController.getReviews);
  app.post('/users/:id/reviews', reviewController.postReview);
};
