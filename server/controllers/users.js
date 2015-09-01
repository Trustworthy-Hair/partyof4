// users.js
var utils = require('../config/utils');

module.exports = {
  signup: function(req, res){
    var models = req.app.get('models');
    var User = models.User;
    var newUser = {};
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.profileImageUrl = req.body.profileImageUrl;
    newUser.interests = req.body.interests;
    newUser.description = req.body.description;
    newUser.status = req.body.status;
    newUser.connectedToFacebook = req.body.connectedToFacebook;

    User.sync().then(function () {
      return User.build(newUser);
    }).then(function (newUser) {
      return newUser.hashPassword();
    }).then(function (newUser) {
      return newUser.save();
    }).then(function (newUser) {
      newUser.set('password', null);
      utils.sendResponse(res, 201, newUser);
    }).catch(function (err) {
      console.log('Error: ', err);
    });
  },

  login: function(){

  },

  logout: function(){

  },

  getUser: function(){

  },

  updateUser: function(){

  },

  getReviews: function(){

  },

  postReview: function(){

  },

  getHistory: function(){

  },

  updateHistory: function(){

  }
};

