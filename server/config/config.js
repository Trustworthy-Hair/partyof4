// config.js

if (process.env.NODE_ENV === 'production') {
  module.exports.database = 'd8vig71t5sntcl';
  module.exports.username = 'mfhekvbccfddha';
  module.exports.password = 'TCeLmDlB6cTUX3T9LWo_BBljIp';
  module.exports.host = 'ec2-54-163-228-0.compute-1.amazonaws.com';
} else {
  module.exports.database = 'partyof4';
  module.exports.username = null;
  module.exports.password = null;
  module.exports.host = '127.0.0.1';
}

module.exports.dialect = 'postgres';
