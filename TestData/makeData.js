// makeData.js

//usage: `node makeData [true/false] [numberOfUsers] [numberOfEvents] [numberOfLocations]`
var dropTables = process.argv[2] || true;
var numOfUsers = process.argv[3] || 10;
var numOfEvents = process.argv[4] || 20;
var numOfLocations = process.argv[5] || 20;


var db = require('../server/config/db');
var config = require('../server/config/config');
var https = require('https');
var faker = require('faker');

var createUsers = function() {
  var newUsers = [];
  for (var i = 0; i < numOfUsers; i++) {
    newUsers.push({
      username: faker.internet.userName(),
      password: 'password',
      email: faker.internet.email(),
      profileImageUrl: faker.image.imageUrl(),
      status: faker.hacker.phrase()
    });
  }
  return newUsers.forEach(function (newUser) {
    return db.User.create(newUser);
  });
};

var createLocations = function() {
  var foursquareId = config.foursquareId;
  var foursquareSecret = config.foursquareSecret;
  var lat = 37.7837418;
  var long = -122.4089911;
  var version = 20150909;

  var newLocations;

  var options = {
    hostname: 'api.foursquare.com',
    port: 443,
    path: '/v2/venues/explore?client_id='+foursquareId+'&client_secret='+foursquareSecret+'&ll='+lat+','+long+'&v='+version,
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    var data = '';
    var newLocations;
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      var responses = JSON.parse(data).response.groups[0].items;
      newLocations = responses.map(function(response) {
        var place = response.venue;
        var location = place.location;
        db.Location.create({
          fourSquareId: place.id,
          name: place.name,
          address: location.address + '\n' + location.city + ', ' + location.state + ' ' + location.postalCode,
          latitude: location.lat,
          longitude: location.lng
        });
      });
    });
  });

  req.end();
  return newLocations;
};

var createEvents = function(users, locations) {
  var newEvents = [];
  for (var i = 0; i < numOfEvents; i++) {
    newEvents.push({
      hostId: Math.ceil(Math.random() * numOfUsers),
      locationId: i + 1,
      plannedTime: (faker.date.future()).toISOString(),
      capacity: 10,
      currentSize: 4,
      currentActivity: 'Ordering',
      completedStatus: false
    });
  }
  return newEvents.map(function(newEvent) {
    return db.Event.create(newEvent);
  });
};

// db.sequelize.sync({force: dropTables})
db.sequelize.sync()
  .then(function() {
    return [createUsers, createLocations].map(function(cb) {
      return cb();
    });
  })
  .spread(function(users, locations) {
    createEvents(users, locations);
  });