process.env.NODE_ENV = 'test';

var supertest = require('supertest'),
    server    = require('../server/server'),
    assert    = require('assert'),
    expect    = require('expect.js')
    utils     = require('./testUtils');

var request = supertest(server);

var testData = {};

describe('routes', function() {

  describe('GET /locations', function() {
    it('should return items from /locations when given a proper latitude and longitude', function(done) {
      request
        .get('/locations?latitude='+utils.coordinates.latitude+'&longitude='+utils.coordinates.longitude)
        .expect(200, done);
    });

    it ('should not return a 200 status code when latitude and longitude are missing or invalid', function(done) {
      request
        .get('/locations')
        .expect(400);

            request
        .get('/locations?latitude=1000&longitude=-1000')
        .expect(400, done);
    });
  });


});
