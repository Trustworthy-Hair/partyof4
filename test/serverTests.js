
// var expect = chai.expect;
var supertest = require('supertest');
var server = require('../server/server');
var assert = require('assert');

var request = supertest(server);

var req;
var res;

describe('routes', function() {

  beforeEach(function () {
    req = {
      username: "testerGuy",
      password: "password",
      email: "test@test.com",
      profileImageUrl: "http://www.google.com/",
      interests: [],
      description: "Most awesome guy ever",
      status: "online",
      connectedToFacebook: false
    };

    res = {
      username: "testerGuy",
      password: null,
      email: "test@test.com",
      profileImageUrl: "http://www.google.com/",
      interests: [],
      description: "Most awesome guy ever",
      status: "online",
      connectedToFacebook: false
    };
  });

  describe('POST', function() {

    it('should return a 201 status code when posting to /users/signup', function(done) {

      request
        .post('/users/signup')
        .send(req)
        .expect(201, done);

      // expect(err).to.deep.equal(response);
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
          assert.deepEqual(result.body, res);
          done();
        });
    })
  })
});
