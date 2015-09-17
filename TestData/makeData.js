// makeData.js

//usage: `node makeData [true/false] [numberOfUsers]`
var dropTables = process.argv[2] || true;
var numOfUsers = process.argv[3] || 10;

var db = require('../server/config/db');
var config = require('../server/config/config');
var https = require('https');
var faker = require('faker');

var createUsers = function() {
  var newUsers = [{
    username: 'buttsmgee',
    password: 'password',
    email: faker.internet.email(),
    profileImageUrl: faker.image.imageUrl(),
    status: faker.hacker.phrase()
  }];
  for (var i = 1; i < numOfUsers; i++) {
    newUsers.push({
      username: faker.internet.userName().toLowerCase(),
      password: 'password',
      email: faker.internet.email(),
      profileImageUrl: faker.image.imageUrl(),
      status: faker.hacker.phrase()
    });
  }
  return newUsers.map(function (newUser) {
    return db.User.create(newUser)
      .then(function(newUser) {
        return newUser.hashPassword(newUser);
      })
      .then(function(newUser) {
        return newUser.save();
      });
  });
};

var createEvents = function() {
  var foursquareId = config.foursquareId;
  var foursquareSecret = config.foursquareSecret;
  var lat = 37.7837418;
  var long = -122.4089911;
  var version = 20150909;

  var options = {
    hostname: 'api.foursquare.com',
    port: 443,
    path: '/v2/venues/explore?client_id='+foursquareId+'&client_secret='+foursquareSecret+'&ll='+lat+','+long+'&v='+version,
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      var responses = JSON.parse(data).response.groups[0].items;
      return responses.map(function(response) {
        var place = response.venue;
        var location = place.location;
        var categories = place.categories.map(function(category) {
          return category.name;
        });
        db.Location.create({
          fourSquareId: place.id,
          name: place.name,
          address: location.address + '\n' + location.city + ', ' + location.state + ' ' + location.postalCode,
          latitude: location.lat,
          longitude: location.lng,
          tags: categories
        }).then(function(location) {
          db.Event.create({
            hostId: Math.ceil(Math.random() * numOfUsers),
            locationId: location.id,
            plannedTime: (faker.date.future()).toISOString(),
            capacity: 10,
            currentSize: 4,
            currentActivity: 'Ordering',
            completedStatus: false,
            description: faker.company.catchPhrase()
          });
        })
      });
    });
  });

  return req.end(function(locations) {
    return locations;
  });
};

db.sequelize.sync({force: dropTables})
//db.sequelize.sync()
  .then(createUsers)
  .then(createEvents);