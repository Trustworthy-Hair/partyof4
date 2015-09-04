// locations.js
var config = require('../config/config.js'),
    https  = require('https');

module.exports = {
  getLocations: function(req,res){

    // Hack Reactor coordinates for testing
    // var lat = 37.7837418;
    // var long = -122.4089911;
    var lat = req.query.latitude;
    var long = req.query.longitude;

    if (!(lat && long)) {
      res.status(400).send('Invalid request - include latitude and longitude in URL parameters').end();
    } else if ((lat < -90 || lat > 90) || (long < -180 || long > 180)) {
      res.status(400).send('Invalid request - latitide and longitude must be valid. (-90 < latitude < 90 and -180 < longitude < 180)').end();
    } else {

      var apiUrl = '/v2/venues/explore?client_id='+config.foursquareId+'&client_secret='+config.foursquareSecret;

      var radius = 1000;
      var version = 20150903;

      var finalUrl = apiUrl+'&ll='+lat+','+long+'&v='+version+'&radius='+radius+'&section=food&limit=50&openNow=1';

      var options = {
        host: 'api.foursquare.com',
        path: finalUrl,
        port: 443,
        method: 'GET'
      };

      https.request(options, function(foursquareRes) {
        var responseBody ='';
        foursquareRes.on('data', function (chunk) {
          responseBody += chunk;
        });

        foursquareRes.on('end', function () {
          var responseArr = JSON.parse(responseBody).response.groups[0].items;

          var locations = [];
          responseArr.forEach(function(item) {
            var location = item.venue;
            locations.push({
              "locationId": location.id,
              "name": location.name,
              "location": location.location.formattedAddress,
              "distance": location.location.distance,
              "tags": location.categories.name,
              "coords": {
                "latitude": location.location.lat,
                "longitude": location.location.lng
              }
            });
          });

          res.status(200).send({'locations':locations}).end();
        });
      }).end();
    }

  },

  getOneLocation: function(){

  }
};