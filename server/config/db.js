// db.js

var config = require('./config');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

var User = sequelize.import('../models/users');
var Event = sequelize.import('../models/events');
var UserEvent = sequelize.import('../models/userEvents');

User.belongsToMany(Event, { through: UserEvent });
Event.belongsToMany(User, { through: UserEvent });

Event.belongsTo(User, { as: 'Host' });

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;

module.exports.User = User;
module.exports.Event = Event;
module.exports.UserEvent = UserEvent;
