// users.js

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
  });

  return User;
};
