
// var expect = chai.expect;
var supertest = require('supertest');
var server = require('../server/server');
var assert = require('assert');

var request = supertest(server);

var testData = {};

describe('routes', function() {

  before(function(done){
    server.get('models').sequelize.sync({ force: true}).then(function () {
      done();
    });
  });

  beforeEach(function () {
    testData.req = {
      username: "test",
      password: "password",
      email: "test@test.com",
      profileImageUrl: "http://www.google.com/",
      interests: [],
      description: "Most awesome guy ever",
      status: "online",
      connectedToFacebook: false
    };

    testData.res = {
      username: "test",
      password: null,
      email: "test@test.com",
      profileImageUrl: "http://www.google.com/",
      interests: [],
      description: "Most awesome guy ever",
      status: "online",
      connectedToFacebook: false
    };

    testData.newUser = {
      username: "brandon",
      password: null,
      email: "test@testical.com",
      profileImageUrl: "http://www.google.com/butts",
      interests: ['butts', 'butts', 'butts', 'butts', 'butts', 'butts', 'butts', 'butts'],
      description: "Most awesome guy ever bc butts",
      status: "lookin for butts",
      connectedToFacebook: false
    };

    testData.loginValid = {
      username: "brandon",
      password: "password"
    };

    testData.loginInvalid = {
      username: "brandon",
      password: "butts"
    }



  });

  describe('POST', function() {

    it('should return a new user for POST: /users/signup', function(done) {

      request
        .post('/users/signup')
        .send(testData.req)
        .end(function (err, result) {
          ['id', 'createdAt', 'updatedAt'].forEach(function (property) {
            delete result.body[property];
          });
          assert.deepEqual(result.body, testdata.res);
          done();
        });
    });
  });

  describe('GET', function(){
    it('should return user', function(done){
      request
        .get('/users/1')
        .end(function (err, result) {
          ['id', 'createdAt', 'updatedAt'].forEach(function (property) {
            delete result.body[property];
          });
          assert.deepEqual(result.body, testdata.res);
          done();
        });
    })
  });

  describe('POST', function(){
    it('should update User', function(done){
      request
        .post('/users/1')
        .send(testData.newUser)
        .end(function (err, result) {
          ['id', 'createdAt', 'updatedAt'].forEach(function (property) {
            delete result.body[property];
          });
          assert.deepEqual(result.body, testData.newUser );
          done();
        });
    })
  });  

  describe('POST', function(){
    it('should recieve token on valid login', function(done){
      request
        .post('/users/login')
        .send()
    })
  })
});
