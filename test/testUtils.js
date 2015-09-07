var supertest = require('supertest'),
    server    = require('../server/server'),
    request   = supertest(server);

var loginValid = {
  username: "test",
  password: "password"
};

var logIn = function(callback) {
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