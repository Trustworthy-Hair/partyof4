process.env.NODE_ENV = 'test';

var supertest = require('supertest'),
    server    = require('../server/server'),
    assert    = require('assert'),
    expect    = require('expect.js'),
    utils     = require('./testUtils.js');

var request = supertest(server);

var testData = {};

describe('routes', function() {

  beforeEach(function () {
    testData.review = {
      EventId: 1,
      subjectId: 1,
      starRating: 3,
      text: "Was late to the event"
    };

  });

  describe('POST', function(){
    it('should be able to write a new review', function(done){
      utils.logIn(function(result, accessToken) {
        request
          .post('/users/2/reviews')
          .send({
            subjects: [testData.review],
            accessToken: accessToken
          })
          .end(function (err, result2) {
            assert.equal(result2.body[0].starRating, testData.review.starRating);
            assert.equal(result2.body[0].text, testData.review.text);
            done();
          });
      });
    })
  });  

  describe('GET', function(){
    it('should be able to retrieve reviews', function(done){
      request
        .get('/users/1/reviews')
        .end(function (err, result) {
          assert.equal(result.body.averageRating, testData.review.starRating);
          assert.equal(result.body.reviews.length, 1);
          done();
        });
    })
  });  

});
