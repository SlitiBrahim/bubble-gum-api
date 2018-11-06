'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      picture: {
        type: Sequelize.STRING
      },
      bio: {
          type: Sequelize.TEXT
      },
      twitter: {
          type: Sequelize.STRING
      },
      linkedin: {
          type: Sequelize.STRING
      },
      github: {
          type: Sequelize.STRING
      },
      website: {
          type: Sequelize.STRING
      }
    })
    .then(() => {
      // add a foreign key on users table referencing profiles table
      return queryInterface.addConstraint('users', ['profileId'], {
        type: 'FOREIGN KEY',
        name: 'FK_profileId_users',
        references: {
          table: 'profiles',
          field: 'id'
        }
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('profiles');
  }
};
