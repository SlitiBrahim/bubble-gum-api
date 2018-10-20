'use strict';

/*
    The validation is implemented in userValidate file
    which checks for request parameters and request payloads on user model
*/

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
    bannedAt: {
      type: DataTypes.DATE,
    },
    birthdayDate: {
      type: DataTypes.DATE,
    },
    isDeleted: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.deletedAt !== null
      }
    }
  }, {
    // set deletedAt attribute when deleteing instance (softDeletable)
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ['password'] }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};