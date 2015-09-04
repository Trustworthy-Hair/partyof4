// config.js

var options = {};
var databaseUrl, foursquareId, foursquareSecret;

if (process.env.NODE_ENV === 'production') {
  databaseUrl = process.env.DATABASE_URL;
  foursquareId = process.env.FOURSQUARE_ID; 
  foursquareSecret = process.env.FOURSQUARE_SECRET;
} else if (process.env.NODE_ENV === 'test') {
  databaseUrl = 'postgres://127.0.0.1:5432/partyof4test';
} else {
  databaseUrl = 'postgres://127.0.0.1:5432/partyof4';
}


module.exports = {
  databaseUrl: databaseUrl,
  options: options,
  foursquareId: foursquareId,
  foursquareSecret: foursquareSecret
};
