// config.js

if (process.env.NODE_ENV === 'production') {
  module.exports.database = 'INSERT DATABASE';
  module.exports.username = 'INSERT USERNAME';
  module.exports.password = 'INSERT PASSWORD';
  module.exports.host = 'INSERT HOST';
} else {
  module.exports.database = 'partyof4';
  module.exports.username = null;
  module.exports.password = null;
  module.exports.host = '127.0.0.1';
}

module.exports.dialect = 'postgres';
