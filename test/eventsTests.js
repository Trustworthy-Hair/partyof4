process.env.NODE_ENV = 'test';

var supertest = require('supertest');
var server = require('../server/server');
var assert = require('assert');

var request = supertest(server);

var req;
var expectedResponse;

describe('Events routes: ', function() {

  beforeEach(function () {
    req = {
      HostId: 1,
      locationId: 1,
      plannedTime: (new Date(2015, 8, 2, 19, 30)).toISOString(),
      capacity: 10,
      currentSize: 4,
      currentActivity: 'Ordering',
      completedStatus: false
    };

    expectedResponse = {};
    for (var key in req) {
      expectedResponse[key] = req[key];
    }
  });

  describe('POST to /events', function() {

    it('should return a 201 status code and respond with the created event', function (done) {

      request
        .post('/events')
        .send(req)
        .end(function (err, actualResponse) {          
          ['id', 'createdAt', 'updatedAt'].forEach(function (property) {
            delete actualResponse.body[property];
          });

          assert.equal(actualResponse.status, 201);
          assert.deepEqual(actualResponse.body, expectedResponse);
          done();
        });
    });
  });

  describe('GET to /events/:eventId', function () {
    it('should return an existing event', function (done) {
      request
        .get('/events/1')
        .end(function (err, actualResponse) {          
          ['id', 'createdAt', 'updatedAt'].forEach(function (property) {
            delete actualResponse.body[property];
          });

          assert.deepEqual(actualResponse.body, expectedResponse);
          done();
        });
    });

    it('should not return an nonexistent event', function (done) {
      request
        .get('/events/2')
        .end(function (err, actualResponse) {
          assert.deepEqual(actualResponse.body, {});
          done();
        });
    });
  });

  describe('PUT to /events/:eventId', function() {

    it('should return a 200 status code', function (done) {

      req.currentActivity = 'Eating';

      request
        .put('/events/1')
        .send(req)
        .end(function (err, actualResponse) {          
          assert.equal(actualResponse.status, 200);
          done();
        });
    });

    it('should modify the event in the database', function (done) {

      request
        .get('/events/1')
        .end(function (err, actualResponse) {          
          ['id', 'createdAt', 'updatedAt'].forEach(function (property) {
            delete actualResponse.body[property];
          });

          assert.notDeepEqual(actualResponse.body, expectedResponse);
          expectedResponse.currentActivity = 'Eating';
          assert.deepEqual(actualResponse.body, expectedResponse);
          done();
        });
    });
  });

});
