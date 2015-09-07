var utils = require('../config/utils');

var getInfo = function(req) {
  var userId = req.params.id;
  var models = req.app.get('models');
  var Review = models.Review;
  return {userId: userId, Review: Review};
};

module.exports = {

  getReviews: function(req, res){
    var reviewUtils = getInfo(req);

    reviewUtils.Review.sync().then(function() {
      return reviewUtils.Review.findAll({
        where: {subjectId: reviewUtils.userId}
      });
    })
    .then(function(results) {
      var totalStar = results.reduce(function(previous, current) {
        return previous + current.starRating;
      }, 0);
      var averageStar = totalStar / results.length;

      var reviews = results.map(function(data) {
        return {
          authorId: data.authorId,
          eventId: data.eventId,
          starRating: data.starRating,
          text: data.text, 
          createdAt: data.createdAt
        };
      });

      var reviewData = {
        averageRating: averageStar,
        reviews: reviews
      };

      utils.sendResponse(res,200,reviewData);
    });
  },

  postReview: function(req, res){
    var reviewUtils = getInfo(req);

    var review = {
      starRating: req.body.starRating, 
      text: req.body.text,
      authorId: req.userId,
      subjectId: reviewUtils.userId,
      eventId: req.body.eventId
    };

    reviewUtils.Review.sync().then(function() {
      return reviewUtils.Review.create(review);
    }).then(function(newReview) {
      utils.sendResponse(res,200,newReview);
    });
  },
};
