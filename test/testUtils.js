var supertest = require('supertest');
var server = require('../server/server');
var request = supertest(server);

var loginValid = {
  username: "test",
  password: "password"
};

var logIn = function(callback, accessToken) {
  request
    .post('/users/login')
    .send(loginValid)
    .end(function (err, result){
      var accessToken = result.res.body.token;
      callback(result, accessToken);
    });
};

module.exports = {
  logIn: logIn
};