// makeData.js

//usage: `node makeData [true/false] [numberOfUsers] [numberOfEvents] [numberOfLocations]`
var dropTables = process.argv[2] || true;
var numOfUsers = process.argv[3] || 10;
var numOfEvents = process.argv[4] || 20;
var numOfLocations = process.argv[5] || 20;


var db = require('../server/config/db');
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
  var newLocations = [];
  for (var i = 0; i < numOfLocations; i++) {
    newLocations.push({
      fourSquareId: "" + (i + 1),
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      price: Math.round(Math.random() * 5),
      longitude: parseFloat(faker.address.longitude()),
      latitude: parseFloat(faker.address.latitude()),
      tags: [faker.company.bsNoun(), faker.company.bsNoun()]
    });
  }
  return newLocations.map(function (newLocation) {
    return db.Location.create(newLocation);
  });
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