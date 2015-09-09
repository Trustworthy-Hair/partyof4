var supertest = require('supertest'),
    server    = require('../server/server'),
    request   = supertest(server);

var loginValid = [
  { username: "test",
    password: "password" },
  { username: "brandon",
    password: "password" },
  { username: "shelley",
    password: "shelley" }];

var coordinates = {
  latitude: 37.7837209,
  longitude:-122.4090445
};


var logIn = function(callback, cred) {
  var credentials = cred ? loginValid[cred] : loginValid[0];
  request
    .post('/users/login')
    .send(credentials)
    .end(function (err, result){
      var accessToken = result.res.body.token;
      callback(result, accessToken);
    });
};

module.exports = {
  logIn: logIn,
  coordinates: coordinates
};