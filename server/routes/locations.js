// locations.js
var locationController = require('../controllers/locations');

module.exports = function(app){
  app.get('/locations', locationController.getLocations);
};