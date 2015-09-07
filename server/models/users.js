// users.js
var bBird = require("bluebird");
var bcrypt = bBird.promisifyAll(require('bcrypt-nodejs'));

var instanceMethods = {};
instanceMethods.hashPassword = function (newUser) {
  return bcrypt.genSaltAsync(10)
  .then(function (salt) {
    return bcrypt.hashAsync(newUser.password, salt, null);
  })
  .then(function (hash) {
    return newUser.set('password', hash);
  })
  .catch(function (err) {
    console.log('Error: ', err);
  });
};

instanceMethods.comparePassword = function (user, potentialUser) {
  return bcrypt.compareAsync(potentialUser.password, user.password)
  .then(function (matched){
    if(!matched) return bBird.resolve(false);
    else return bBird.resolve(user);
  });
};


module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
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
      allowNull: false,
      defaultValue: 'New User!'
    },
    connectedToFacebook: DataTypes.BOOLEAN
  },{
    instanceMethods : instanceMethods
  });

  return User;
};
