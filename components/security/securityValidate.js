const Joi = require('joi');

const validationErrors = require('./securityValidateErrors');
const userValidate = require('../user/userValidate');

const validation = {
    login: {
        // same restriction for username and password as user creation
        body: {
            username: userValidate.createUser.body.username,
            password: userValidate.createUser.body.password
        }
    }
};

module.exports = validation;