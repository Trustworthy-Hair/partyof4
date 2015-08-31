// db.js

var config = require('./config');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

var User = sequelize.import('../models/users');

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;

module.exports.User = User;
