// makeData.js

// Enter the number of new users you want to insert
var numOfUsers = 10;

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

db.User.sync().then(function() {
  newUsers.forEach(function(newUser) {
    db.User.build(newUser).save();
  });
});
