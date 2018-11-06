'use strict';

module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile', {
        picture: {
            type: DataTypes.STRING
        },
        bio: {
            type: DataTypes.TEXT
        },
        linkedin: {
            type: DataTypes.STRING
        },
        twitter: {
            type: DataTypes.STRING
        },
        github: {
            type: DataTypes.STRING
        },
        website: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true
    });

    Profile.associate = function(models) {
        // associations here
        Profile.belongsTo(models.user);
    };

    return Profile;
};