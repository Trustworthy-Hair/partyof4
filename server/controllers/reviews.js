var utils = require('../config/utils');

var getInfo = function(req) {
  var userId = req.params.id;
  var models = req.app.get('models');
  var Review = models.Review;
  return {userId: userId, Review: Review};
};

var addToDatabase = function(options){
  options.reviews[options.count].authorId = options.utils.userId
  var savedReview = options.utils.Review.create(options.reviews[options.count]);
  options.cb(options);
  return savedReview;
};

var recursiveAdd = function(options){
  options.count++;
  if(options.reviews[options.count]) return addToDatabase(options);
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
      cb: recursiveAdd
    }

    reviewUtils.Review.sync().then(function() {
      return addToDatabase(options)
    }).then(function(newReview) {
      options.savedReviews.push(newReview);
      return options.savedReviews;
    }).then(function(savedReviews){
      if(savedReviews.length === reviews.length) utils.sendResponse(res,200, savedReviews);
    }).catch(function(err){
      console.log('Error: ', err)
    });
  }
};
