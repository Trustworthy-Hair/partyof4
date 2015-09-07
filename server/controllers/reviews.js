var utils = require('../config/utils');

module.exports = {

  getReviews: function(req,res){
    var userId = req.params.id;
    var models = req.app.get('models');
    var Review = models.Review;

    Review.sync().then(function() {
      return Review.findAll({
        where: {subjectId: userId}
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

  postReview: function(){

  },
};
