var utils = require('../config/utils');

var getInfo = function(req) {
  var userId = req.params.id;
  var models = req.app.get('models');
  var Review = models.Review;
  return {userId: userId, Review: Review};
};

var recursiveAdder = function(options){
  for(var i = 0; i < options.reviews.length; i++){
    var review = options.reviews[i];
    review.authorId = options.utils.userId
    options.utils.Review.sync().then(function() {
      return options.utils.Review.create(review);
    }).then(function(newReview) {
      options.savedReviews.push(newReview.dataValues);
      return options.savedReviews;
    }).catch(function(err){
      console.log('Error: ', err)
    });
  }
  return options;
}

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
    var reviews = [];
    var count = 0;

    for(var i = 0; i < req.body.subjects.length; i++){
      reviews.push(req.body.subjects[i]);
    }

    var options = {
      count: count,
      reviews: reviews,
      savedReviews: [],
      utils: reviewUtils,
    }


    recursiveAdder(options);

  }
};
