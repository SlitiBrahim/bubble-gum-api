const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const userRepo = require('./userRepository');
const validation = require('./userValidate');
const controllerUtils = require('../../utils/controller');
const verifyToken = require('../security/securityMiddleware').verifyToken;

router.route('/')
    .get(verifyToken, (req, res) => {
        userRepo.getAll()
            .then(users => {
                res.status(200).json({ users })
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err.message });
            });
    })

    // In case method was not matched (= method not allowed)
    .all((req, res) => controllerUtils.methodNotAllowed(req, res, router))
;

router.route('/:id')
    .get(validate(validation.getUser), verifyToken, (req, res) => {
        const id = req.params.id;
        userRepo.getOne(id)
            .then(user => {
                if (user !== null) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ error: `User not found with id ${id}` });
                }
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err.message });
            });
    })
    .delete(validate(validation.getUser), verifyToken, (req, res) => {
        const id = req.params.id;
        userRepo.delete(id)
            .then(deletedUser => {
                res.status(200).json({ deletedUser });
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err.message });
            });
    })
    .put(validate(validation.getUser), validate(validation.updateUser), verifyToken, (req, res) => {
        const id = req.params.id;
        const params = req.body;
        
        userRepo.update(id, params)
            .then(updatedUser => {
                res.status(200).json({ updatedUser });
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err.message });
            });
    })

    // In case method was not matched (= method not allowed)
    .all((req, res) => controllerUtils.methodNotAllowed(req, res, router))
;

module.exports = router;