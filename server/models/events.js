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
    plannedTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 }
    },
    currentSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    currentActivity: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    completedStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    validate: {
      currentSizeExceedsCapacity: function() {
        if (this.currentSize > this.capacity) {
          throw new Error('Current size exceeds capacity');
        }
      }
    }
  });

  return Event;
};