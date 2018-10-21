const User = require('../../models/index').user;
const HttpError = require('../../errors/HttpError');

const userRepo = {};

userRepo.getAll = () => {
    return new Promise((resolve, reject) => {
        User.findAll()
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
        User.findById(id)
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

userRepo.getOneByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.findAll({
            where: { email }
        })
        .then(user => {
            // check that a user is returned and not an empty array
            if (user.length) {
                resolve(user);
            } else {
                throw new HttpError({ message: `User not found with email ${email}`, statusCode: 404 });
            }
        })
        .catch(err => {
            reject(err);
        })
    });
}

userRepo.getOneByUsername = (username) => {
    return new Promise((resolve, reject) => {
        User.findAll({
            where: { username }
        })
        .then(user => {
            // check that a user is returned and not an empty array
            if (user.length) {
                resolve(user);
            } else {
                throw new HttpError({ message: `User not found with username ${username}`, statusCode: 404 });
            }
        })
        .catch(err => {
            reject(err);
        })
    });
}

userRepo.create = (properties) => {
    return new Promise((resolve, reject) => {
        userRepo.getOneByUsername(properties.username)
            .then(() => {
                // username is already taken, return error since it should be unique
                reject(new HttpError({ message: `username "${properties.username}" is already taken`, statusCode: 409 }));
            })
            .catch(() => {
                // username is not taken, process to email verification
                userRepo.getOneByEmail(properties.email)
                    .then(() => {
                        // email is already taken, return error since it should be unique
                        reject(new HttpError({ message: `email "${properties.email}" is already taken`, statusCode: 409 }));
                    })
                    .catch(() => {
                        // username and email are not taken, process to user creation
                        User.create(properties)
                            .then(createdUser => {
                                resolve(createdUser);
                            })
                            .catch(err => {
                                console.error("ERROR", err);
                                reject(new HttpError({ message: err.message, statusCode: 400 }));
                            });
                    })
            })
    });
}

userRepo.delete = (id) => {
    return new Promise((resolve, reject) => {
        userRepo.getOne(id)
            .then(user => {
                return user.destroy();
            })
            .then(deletedUser => {
                resolve(deletedUser);
            })
            .catch(err => {
                console.error("ERROR", err);
                reject(err);
            });
    });
}

userRepo.update = (id, properties) => {
    return new Promise((resolve, reject) => {
        userRepo.getOne(id)
            .then(user => {
                return user.update(properties);
            })
            .then(updatedUser => {
                // exclude password property to be returned
                delete updatedUser.dataValues.password;

                resolve(updatedUser);
            })
            .catch(err => {
                console.log("ERROR", err);
                reject(err);
            });
    });
}

module.exports = userRepo;