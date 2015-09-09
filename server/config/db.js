// db.js

var config = require('./config');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.databaseUrl, config.options);

var User = sequelize.import('../models/users');
var Event = sequelize.import('../models/events');
var UserEvent = sequelize.import('../models/userEvents');
var Review = sequelize.import('../models/reviews');
var Location = sequelize.import('../models/locations');

User.belongsToMany(Event, { through: UserEvent });
Event.belongsToMany(User, { through: UserEvent });

Event.belongsTo(User, { as: 'host' });

Location.hasMany(Event, { foreignKey: 'locationId'});
Event.belongsTo(Location, { foreignKey: 'locationId' });

Review.belongsTo(User, { as: 'author' });
Review.belongsTo(User, { as: 'subject' });
Review.belongsTo(Event);


module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  User: User,
  Event: Event,
  UserEvent: UserEvent,
  Review: Review,
  Location: Location
};


// RUN THE FOLLOWING CODE TO MAKE SURE TABLES ARE ADDED CORRECTLY

// sequelize.sync();
