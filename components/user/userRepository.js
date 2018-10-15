const User = require('../../models/index').user;
const HttpError = require('../../errors/HttpError');

const userRepo = {};

userRepo.getAll = () => {
    return new Promise((resolve, reject) => {
        User.findAll({ attributes: { exclude: ['password'] } })
            .then(users => {
                resolve(users);
            })
            .catch(err => {
                console.error("ERROR", err);
                reject(new HttpError({ message: err.message, statusCode: 500 }));
            })
    });
}

userRepo.getOne = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, { attributes: { exclude: ['password'] } })
            .then(user => {
                // user was not found, trigger catch statement
                if (!user) {
                    throw `User not found with id ${id}`;
                }

                resolve(user);
            })
            .catch(err => {
                console.error("ERROR", err);
                reject(new HttpError({ message: `User not found with id ${id}`, statusCode: 404 }));
            })
    });
}

module.exports = userRepo;