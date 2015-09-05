// middleware.js
var bodyParser = require('body-parser');
var userRoutes = require('../routes/users');
var eventRoutes = require('../routes/events');
var locationRoutes = require('../routes/locations');
var reviewRoutes = require('../routes/reviews');
var jwt = require('jwt-simple');
var utils = require('../config/utils');

var authToken = function(req, res, next) {
  var acceptedUrls = ['/','/users/signin','/users/signup'];
  if (acceptedUrls.indexOf(req.path) !== -1) {
    return next();
  } else {
    var token = (req.body && req.body.accessToken) || (req.query && req.query.accessToken) || req.headers['x-access-token'];

    if (token) {
      try {
        var decoded = jwt.decode(token, utils.jwtTokenSecret);
        if (decoded.exp <= Date.now()) {
          utils.sendResponse(res, 400, 'Access token has expired');
        } else {
          req.userId = decoded.iss;
          return next();
        }
      } catch (err) {
        utils.sendResponse(res, 400, err);
      }
    } else {
      utils.sendResponse(res, 404, {error: "Not logged in"});
    }
  }
};

module.exports = function(app, express) {
  app.use(bodyParser.json());

  app.use(express.static(__dirname + '/../../client/'));

  app.use(authToken);

  userRoutes(app);
  eventRoutes(app);
  reviewRoutes(app);
  locationRoutes(app);
};

