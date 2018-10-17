'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "email must be an email address"
        }
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 15],
          msg: "username length should be of mimimum of 4 characters and maximum of 15 characters"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          // minlength 8, maxlength 128, alphanumeric characters
          args: /^[a-zA-Z0-9]{8,128}/,
          msg: "password length must be of minimum of 8 characters, it could include lowercase and uppercase alphabetic characters, numbers and symbols"
        }
      }
    },
    deletedAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: "deletedAt must be of type of date"
        }
      }
    },
    bannedAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: "bannedAt must be of type of date"
        }
      }
    },
    birthdayDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: "birthdayDate must be of type of date"
        }
      }
    },
    isDeleted: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.deletedAt !== null
      }
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