// middleware.js
var bodyParser     = require('body-parser'),
    userRoutes     = require('../routes/users'),
    eventRoutes    = require('../routes/events'),
    locationRoutes = require('../routes/locations'),
    reviewRoutes   = require('../routes/reviews'),
    jwt            = require('jwt-simple'),
    utils          = require('../config/utils');

var authToken = function(req, res, next) {
  var reqPath = req.path;
  if (req.method ==='GET') {
    if (req.path.substring(0,6) === '/users') reqPath = '/users';
    if (req.path.substring(0,7) === '/events') reqPath = '/events';
  }
  var acceptedPostUrls = ['/users/login','/users/signup'];
  var acceptedGetUrls = ['/','/locations', '/users', '/events'];

  var checkAccepted = (req.method === 'GET') ? (acceptedGetUrls.indexOf(reqPath) !== -1) : (acceptedPostUrls.indexOf(reqPath) !== -1);

  if (checkAccepted) {
    return next();
  } else {
    var token = (req.body && req.body.accessToken) || (req.query && req.query.accessToken) || req.headers['x-access-token'];

    if (token) {
      try {
        var decoded = jwt.decode(token, utils.jwtTokenSecret);
        if (decoded.exp <= Date.now()) {
          utils.sendResponse(res, 400, 'Access token has expired');
        } else {
          req.userId = decoded.id;
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

