const Joi = require('joi');

const validationErrors = require('./userValidateErrors');

const validation = {
    getUser: {
        params: {
            id: Joi.number().integer().required().error(errors => validationErrors.getUser.id)
        }
    },

    createUser: {
        body: {
            id: Joi.forbidden().error(errors => validationErrors.createUser.id),
            email: Joi.string().email().required().error(errors => validationErrors.createUser.email),
            username: Joi.string().alphanum().min(4).max(15).required().error(errors => validationErrors.createUser.username),
            password: Joi.string().regex(/^[a-zA-Z0-9]{8,128}/).required().error(errors => validationErrors.createUser.password),
            deletedAt: Joi.forbidden().error(errors => validationErrors.createUser.deletedAt),
            bannedAt: Joi.forbidden().error(errors => validationErrors.createUser.bannedAt),
            birthdayDate: Joi.date().max(new Date()).error(errors => validationErrors.createUser.birthdayDate), // TODO: Change from now to -13years
            isDeleted: Joi.forbidden().error(errors => validationErrors.createUser.isDeleted)
        }
    },

    updateUser: {
        body: {
            id: Joi.forbidden().error(errors => validationErrors.updateUser.id),
            email: Joi.string().email().error(errors => validationErrors.updateUser.email),
            username: Joi.string().alphanum().min(4).max(15).error(errors => validationErrors.updateUser.username),
            password: Joi.string().regex(/^[a-zA-Z0-9]{8,128}/).error(errors => validationErrors.updateUser.password),
            deletedAt: Joi.forbidden().error(errors => validationErrors.updateUser.deletedAt),
            bannedAt: Joi.date().max(new Date()).error(errors => validationErrors.updateUser.bannedAt),
            birthdayDate: Joi.date().max(new Date()).error(errors => validationErrors.updateUser.birthdayDate), // TODO: Change from now to -13years
            isDeleted: Joi.forbidden().error(errors => validationErrors.updateUser.isDeleted)
        }
    }
};

module.exports = validation;