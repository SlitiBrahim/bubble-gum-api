const User = require('../../models/index').user;
const HttpError = require('../../errors/HttpError');
const bcrypt = require('bcrypt');

const userRepo = {};
const hashCost = 10;

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

                        // hash clear text passed password
                        bcrypt.hash(properties.password, hashCost)
                            .then(hash => {
                                // replace passed clear text password by its hash
                                properties.password = hash;

                                User.create(properties)
                                    .then(createdUser => {
                                        // make a copy of createdUser instance to be able to delete password property
                                        // avoiding password to be returned
                                        let userCopy = Object.assign({}, createdUser.dataValues);
                                        delete userCopy.password;

                                        resolve(userCopy);
                                    })
                                    .catch(err => {
                                        console.error("ERROR", err);
                                        reject(new HttpError({ message: err.message, statusCode: 400 }));
                                    });
                            })
                            .catch(err => {
                                reject(new HttpError({ message: err.message, statusCode: 500 }));
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
                if (properties.password) {
                    // save passed password in a constant
                    const clearPassword = properties.password;
                    // so we can delete it from properties object and avoid updating
                    // user with clear text password, in the user.update(properties) outside of this if stmt
                    delete properties.password;

                    // hash clear text passed password
                    bcrypt.hash(clearPassword, hashCost)
                        .then((hash) => {
                            return user.update({ password: hash });
                        })
                        .catch(err => {
                            reject(new HttpError({ message: err.message, statusCode: 500 }));
                        });
                }
                
                // there are steel properties to update
                if (properties) {
                    // update all properties except password wich will be updated by the hash promise below 
                    return user.update(properties);
                }
            })
            .then(updatedUser => {
                // make a copy of createdUser instance to be able to delete password property
                // avoiding password to be returned
                let userCopy = Object.assign({}, updatedUser.dataValues);
                delete userCopy.password;

                resolve(userCopy);
            })
            .catch(err => {
                console.log("ERROR", err);
                reject(new HttpError({ message: err.message, statusCode: 500 }));
            });
    });
}

module.exports = userRepo;