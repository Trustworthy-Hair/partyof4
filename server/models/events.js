// events.js

/*
Some Open Issues:
  - Add some additional validation to these fields:
    - None of these should be null, except maybe currentActivity
    - Capacity should be greater than 0
    - Current size should be >= 0 and <= capacity
  - Add some default values
    - completedStatus: false
    - currentActivity: null?
Note:
  - This will have createdAt and updatedAt fields that we may need to use.
*/

module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    locationId: DataTypes.INTEGER,
    plannedTime: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    currentSize: DataTypes.INTEGER,
    currentActivity: DataTypes.STRING,
    completedStatus: DataTypes.BOOLEAN
  });

  return Event;
};