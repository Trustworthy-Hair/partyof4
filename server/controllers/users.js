// users.js
var utils = require('../config/utils');
var jwt = require('jwt-simple');
var secret = 'shhhh';

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
      if(user) utils.sendResponse(res, 301, {error: "username taken"});
      else return User.build(newUser);
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

  login: function(req, res){
    var models = req.app.get('models');
    var User = models.User;
    var potentialUser = {};
    potentialUser.username = req.body.username;
    potentialUser.password = req.body.password;

    var options = {};
    options.where = {username: potentialUser.username};

    User.sync().then(function (){
      return User.findOne(options);
    }).then(function (user){
      if(!user) utils.sendResponse(res, 301, {error: "User not found"});
      else return user.comparePassword(user, potentialUser);
    }).then(function (user){
      if(user){
        var token = jwt.encode(user, secret);
        utils.sendResponse(res, 200, {token: token});
      }else utils.sendResponse(res, 404, {error: "Password incorrect"});
    }).catch(function (err){
      console.log('Error: ', err);
    });
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

  updateUser: function(req, res){
    var models = req.app.get('models');
    var User = models.User;
    var userId = req.params.userId;
    var updatedUser = {};
    updatedUser.username = req.body.username;
    updatedUser.password = req.body.password;
    updatedUser.email = req.body.email;
    updatedUser.profileImageUrl = req.body.profileImageUrl;
    updatedUser.interests = req.body.interests;
    updatedUser.description = req.body.description;
    updatedUser.status = req.body.status;
    updatedUser.connectedToFacebook = req.body.connectedToFacebook;

    User.sync().then(function () {
      return User.findById(userId);
    }).then(function (user){
      return user.set(updatedUser);
    }).then(function (user){
      return user.hashPassword(user);
    }).then(function (user){
      return user.save();
    }).then(function (user){
      user.set('password', null);
      utils.sendResponse(res, 201, user);
    }).catch(function (err){
      console.log('Error: ', err);
    });
  }
};

