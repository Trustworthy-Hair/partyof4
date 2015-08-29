// middleware.js
var bodyParser = require('body-parser');
var userRoutes = require('../routes/users');
var eventRoutes = require('../routes/events');
var locationRoutes = require('../routes/locations');

module.exports = function(app, express) {
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/../../client/'));

  eventRoutes(app);
  userRoutes(app);
  locationRoutes(app);
};

