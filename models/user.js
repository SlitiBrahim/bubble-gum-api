'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE
    },
    bannedAt: {
      type: DataTypes.DATE
    },
    birthdayDate: {
      type: DataTypes.DATE
    }
  }, {
    // set deletedAt attribute when deleteing instance (softDeletable)
    paranoid: true
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};