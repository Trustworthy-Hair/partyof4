// config.js

var options = {};
var databaseUrl;

if (process.env.NODE_ENV === 'production') {
  databaseUrl = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  databaseUrl = 'postgres://127.0.0.1:5432/partyof4test';
} else {
  databaseUrl = 'postgres://127.0.0.1:5432/partyof4';
}

module.exports.databaseUrl = databaseUrl;
module.exports.options = options;
