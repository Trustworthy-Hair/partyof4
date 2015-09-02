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

    var options = {};
    options.where = {username: newUser.username};

    User.sync().then(function () {
      return User.findOne(options);
    }).then(function (user){
      if (user){ utils.sendResponse(res, 301, {error: "username taken"});}
      else{ return User.build(newUser);}
    })
    .then(function (newUser) {
      return newUser.hashPassword(newUser);
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

  getUser: function(req, res){
    var models = req.app.get('models');
    var User = models.User;
    var userId = req.params.userId;
    User.sync().then(function () {
      return User.findById(userId);
    }).then(function (user) {
      user.set('password', null);
      utils.sendResponse(res, 200, user);
    }).catch(function (err) {
      console.log('Error: ', err);
    });
  },

  updateUser: function(){

  },

  getHistory: function(){

  },

  updateHistory: function(){

  }
};

