// makeData.js

//usage: `node makeData [numberOfUsers] [numberOfEvents]`
var numOfUsers = process.argv[2] || 10;
var numOfEvents = process.argv[3] || 20;

var db = require('../server/config/db');
var faker = require('faker');

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

newUsers.forEach(function(newUser) {
  db.User.build(newUser).save();
});

