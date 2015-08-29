// middleware.js
var bodyParser = require('body-parser');
var express = require('express');
var userRoutes = require('../routes/users.js');
var eventRoutes = require('../routes/events.js');
var locationRoutes = require('../routes/locations.js');

module.exports = function(app) {
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/../../client/build/'));

  eventRoutes(app);
  userRoutes(app);
  locationRoutes(app);
};

