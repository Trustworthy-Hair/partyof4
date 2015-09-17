var utils = require('../config/utils');

var getInfo = function(req) {
  var userId = req.params.id;
  var models = req.app.get('models');
  var Review = models.Review;
  return {userId: userId, Review: Review};
};

var recursiveAdder = function(options, callback){
  var results = [];
  var invoker = function(index){
    if(options.reviews[index]){
      var review = options.reviews[index];
      review.authorId = options.utils.userId;

      options.utils.Review.sync().then(function() {
        return options.utils.Review.create(review);
      }).then(function(newReview) {
        results.push(newReview.dataValues);
        invoker(index+1);
      }).catch(function(err){
        console.log('Error: ', err);
      });

    }else{
      return callback(results);
    }
  };
  invoker(0);
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
    var count = 0;

    var options = {
      count: count,
      reviews: req.body.subjects,
      utils: reviewUtils,
    };

    recursiveAdder(options, function(results){
      utils.sendResponse(res,200, results);
    });

  }
};
