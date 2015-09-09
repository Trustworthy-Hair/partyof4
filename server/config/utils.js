
var deg2rad = function(deg) {
  return deg * (Math.PI/180);
};

var getDistanceFromLatLon = function(loc1,loc2) {
  var lat1 = loc1.latitude,
      lon1 = loc1.longitude;
  var lat2 = loc2.latitude,
      lon2 = loc2.longitude;

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d*1000;
};

var checkLatLong = function(req, res) {
  var lat = req.query.latitude;
  var long = req.query.longitude;
    
  if (!(lat && long)) {
    return res.status(400).send('Invalid request - include latitude and longitude in URL parameters').end();
  } else if ((lat < -90 || lat > 90) || (long < -180 || long > 180)) {
    return res.status(400).send('Invalid request - latitide and longitude must be valid.' +
                         '(-90 < latitude < 90 and -180 < longitude < 180)').end();
  } else {
    return {
      latitude: lat,
      longitude: long
    };
  }
};


module.exports = {
  sendResponse: function(res, statusCode, data){
    res.status(statusCode).send(data).end();
  },
  jwtTokenSecret: 'shhhh',
  checkDistance: getDistanceFromLatLon,
  checkLatLong: checkLatLong
};