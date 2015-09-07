// users.js
var utils = require('../config/utils');
var jwt = require('jwt-simple');

module.exports = {
  signup: function(req, res){
    var models = req.app.get('models');
    var User = models.User;
    var newUser = {};
    for(var x in req.body){
      newUser[x] = req.body[x];
    }

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
      var expireDate = Date.now() + 100000000;
      var token = jwt.encode({"id": newUser.id,
                              "exp": expireDate}, utils.jwtTokenSecret);
      newUser.set('password', null);
      var returnObject = {
        token: token,
        user: newUser
      };
      utils.sendResponse(res, 200, returnObject);
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
        var expireDate = Date.now() + 100000000;
        var token = jwt.encode({"id": user.username,
                                "exp": expireDate}, utils.jwtTokenSecret);
        user.set('password', null);
        var returnObject = {
          token: token,
          user: user
        };
        utils.sendResponse(res, 200, returnObject);
      } else utils.sendResponse(res, 404, {error: "Password incorrect"});
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

    var currentUser = req.userId;
    console.log('***********************************************'+currentUser);
    if (userId !== currentUser) {
      utils.sendResponse(res, 403, 'Unauthorized to edit this user');
    }

    var updatedUser = {};
    for(var x in req.body){
      updatedUser[x] = req.body[x];
    }

    User.sync().then(function () {
      return User.findById(userId);
    }).then(function (user){
      return user.set(updatedUser);
    }).then(function (user){
      if (updatedUser.password === undefined) return user;
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

