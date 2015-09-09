// locations.js
// caches location information from foursquare 

// TO-DO: Foursquare ToS says data can be stored for 30 days before it must be updated. 
// Any data that is older than 30 days should be removed. 

module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    fourSquareId: DataTypes.STRING(24),
    name: DataTypes.STRING,
    address: DataTypes.JSON,
    price: DataTypes.INTEGER,
    longitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    tags: DataTypes.ARRAY(DataTypes.TEXT),
  });

  return Location;
};