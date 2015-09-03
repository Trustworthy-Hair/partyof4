// db.js

var config = require('./config');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.databaseUrl, config.options);

var User = sequelize.import('../models/users');
var Event = sequelize.import('../models/events');
var UserEvent = sequelize.import('../models/userEvents');
var Review = sequelize.import('../models/reviews');

User.belongsToMany(Event, { through: UserEvent });
Event.belongsToMany(User, { through: UserEvent });

Event.belongsTo(User, { as: 'Host' });

Review.belongsTo(User, { as: 'Author' });
Review.belongsTo(User, { as: 'Subject' });
Review.belongsTo(Event);


module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;

module.exports.User = User;
module.exports.Event = Event;
module.exports.UserEvent = UserEvent;
module.exports.Review = Review;


// RUN THE FOLLOWING CODE TO MAKE SURE TABLES ARE ADDED CORRECTLY

// sequelize.sync();
