// usersEvents.js

/*
Some Open Issues:
  - Add additional validation, particularly for null values
*/

module.exports = function (sequelize, DataTypes) {
  var UserEvent = sequelize.define('UserEvents', {
    userConfirmed: DataTypes.BOOLEAN,
    arrivalStatus: DataTypes.STRING,
    cohost: DataTypes.BOOLEAN
  });

  return UserEvent;
};