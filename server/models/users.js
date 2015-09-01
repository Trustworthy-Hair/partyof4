// users.js
var Promise = require("bluebird");
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var instanceMethods = {};
instanceMethods.hashPassword = function () {
  bcrypt.genSaltAsync(10)
  .then(function (salt) {
    return bcrypt.hashAsync(this.password, salt);
  })
  .then(function (hash) {
    this.setDataValue('password', hash);
  })
  .catch(function (err) {
    console.log('Error: ', err);
  });
};



module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true
      }
    },
    profileImageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    interests: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    connectedToFacebook: DataTypes.BOOLEAN
  },{
    instanceMethods : instanceMethods
  });

  return User;
};
