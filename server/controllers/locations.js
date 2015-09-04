// locations.js
var config = require('../config/config.js'),
    https  = require('https');

module.exports = {
  getLocations: function(req,res){

    var lat = req.query.latitude;
    var long = req.query.longitude;

    if (!(lat && long)) {
      res.status(200).send('Invalid request - include latitude and longitude in URL parameters').end();
    } else {

      var apiUrl = '/v2/venues/search?client_id='+config.foursquareId+'&client_secret='+config.foursquareSecret;

      // Hack Reactor coordinates for testing
      // var lat = 37.7837418;
      // var long = -122.4089911;
      var radius = 1000;
      var cat = '4d4b7105d754a06374d81259';

      var finalUrl = apiUrl+'&ll='+lat+','+long+'&intent=browse&v=20150903&radius='+radius+'&categoryId='+cat;
      console.log(finalUrl);

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
          var responseArr = JSON.parse(responseBody).response.venues;
          var locations = [];
          responseArr.forEach(function(location) {
            locations.push({
              "locationId": location.id,
              "name": location.name,
              "location": location.location.formattedAddress,
              "tags": location.categories.name,
              "coords": {
                "latitude": location.location.lat,
                "longitude": location.location.lng
              }
            });
          });

          res.status(200).send(locations).end();
        });
      }).end();
    }

  },

// https://api.foursquare.com/v2/venues/search?ll=37.7837418,-122.4089911&intent=browse&radius=2000
// &categoryId=4d4b7105d754a06374d81259&oauth_token=EU4NPNYSDTPEOKUBQ1YCJ3KN3HDDQTZYUNGIQVKAD10XIC4R&v=20150903

  getOneLocation: function(){

  }
};