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
                reject(new HttpError({ message: `An error occured when finding all users`, statusCode: 500 }));
            })
    });
}

userRepo.getOne = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id)
            .then(user => resolve(user))
            .catch(err => {
                console.log("ERROR", err);
                reject(new HttpError({ message: `An error occured when finding a user with id ${id}`, statusCode: 500 }));
            });
    });
}

userRepo.getOneByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.findAll({
            where: { email }
        })
        .then(users => {
            // resolve with user if existing or resolve with null
            resolve(users[0] || null);
        })
        .catch(err => {
            console.log("ERROR", err);
            reject(new HttpError({ message: `An error occured when finding a user with email ${email}`, statusCode: 500 }));
        })
    });
}

userRepo.getOneByUsername = (username) => {
    return new Promise((resolve, reject) => {
        User.findAll({
            where: { username }
        })
        .then(users => {
            resolve(users[0] || null);
        })
        .catch(err => {
            console.log("ERROR", err);
            reject(new HttpError({ message: `An error occured when findinf a user with username ${username}`, statusCode: 500 }));
        })
    });
}

userRepo.create = (properties) => {
    return new Promise((resolve, reject) => {
        userRepo.getOneByUsername(properties.username)
            .then(user => {
                if (user) {
                    // user already exists with that username, return error since it should be unique
                    reject(new HttpError({ message: `username "${properties.username}" is already taken`, statusCode: 409 }));
                } else {
                    // username is not taken, process to email verification
                    userRepo.getOneByEmail(properties.email)
                        .then(user => {
                            if (user) {
                                // email is already taken, return error since it should be unique
                                reject(new HttpError({ message: `email "${properties.email}" is already taken`, statusCode: 409 }));
                            } else {
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
                                                reject(new HttpError({ message: "An error occured when creating user", statusCode: 500 }));
                                            });
                                    })
                                    .catch(err => {
                                        console.log("ERROR", err);
                                        reject(new HttpError({ message: `An error occored when hashing password`, statusCode: 500 }));
                                    });
                            }
                        })
                        .catch(err => {
                            reject(err);
                        });
                }
            })
            .catch(err => {
                reject(err);
            });
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
                // collection of promises to execute
                const promises = [
                    Promise.resolve(user)   // little trick to get a promise back resolving a user, in the promises array
                ];

                if (properties.username) {
                    userRepo.getOneByUsername(properties.username)
                        .then(user => {
                            // username is already taken
                            reject(new HttpError({ message: `username "${properties.username}" is already taken`, statusCode: 409 }));
                        });
                }
                if (properties.email) {
                    userRepo.getOneByEmail(properties.email)
                        .then(user => {
                            if (user) {
                                // a user is already existing with that email
                                reject(new HttpError({ message: `email "${properties.email}" is already taken`, statusCode: 409 }));
                            }
                        })
                        .catch(err => {
                            reject(err);
                        });
                }

                // user prodvided a password
                if (properties.password) {
                    // add a promise of plain text password hashing task
                    promises.push(bcrypt.hash(properties.password, hashCost));
                }

                // return results of all promises once resolved
                return Promise.all(promises);
            })
            .then(values => {
                // values contains results of promises that have been resolved
                const [user, encodedPassword] = values;

                // got an encoded password
                if (encodedPassword !== undefined) {
                    // update all passed properties and overriding password property by the encoded password
                    return user.update({
                        ...properties,
                        password: encodedPassword,
                    });
                }

                // in case no password was provided, update all other properties
                return user.update(properties);
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

userRepo.findOneByCredentials = (username, plainTextPassword) => {
    return new Promise((resolve, reject) => {
        userRepo.getOneByUsername(username)
            .then(user => {
                bcrypt.compare(plainTextPassword, user.password)
                    .then(isValidCredentials => {
                        if (isValidCredentials) {
                            // Make a copy of user instance and return it without password property
                            let userCopy = Object.assign({}, user.dataValues);
                            delete userCopy.password;
                            resolve(userCopy);
                        } else {
                            resolve(null);
                        }
                    })
                    .catch(err => {
                        console.log("ERR", err);
                        throw new HttpError({ message: err.message, statusCode: 500 });
                    });
            })
            .catch(() => {
                // In case user was not found with the passed username, return "wrong credentials" message
                // Don't return "username not found" to secure the api from bruteforce attacks
                reject(new HttpError({ message: "Wrong credentials", statusCode: 401 }));
            });
    });
}

module.exports = userRepo;