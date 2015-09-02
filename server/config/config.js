// config.js

if (process.env.NODE_ENV === 'production') {
  module.exports.databaseUrl = process.env.DATABASE_URL;
} else {
  module.exports.databaseUrl = 'postgres://127.0.0.1:5432/partyof4';
}
