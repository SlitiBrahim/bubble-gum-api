const Joi = require('joi');

const validation = {
    getUser: {
        params: {
            id: Joi.number().integer().required()
        }
    },

    createUser: {
        body: {
            email: Joi.string().email().required(),
            username: Joi.string().alphanum().min(4).max(15).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{8,128}/).required(),
            deletedAt: Joi.forbidden(),
            bannedAt: Joi.forbidden(),
            birthdayDate: Joi.date().max(new Date()), // TODO: Change from now to -13years
            isDeleted: Joi.forbidden()
        }
    },

    updateUser: {
        body: {
            email: Joi.forbidden(),
            username: Joi.forbidden(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{8,128}/),
            deletedAt: Joi.forbidden(),
            bannedAt: Joi.date().max(new Date()),
            birthdayDate: Joi.date().max(new Date()), // TODO: Change from now to -13years
            isDeleted: Joi.forbidden()
        }
    }
};

module.exports = validation;