const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const userRepo = require('./userRepository');
const validation = require('./userValidate');

// function that return a 405 error (method not allowed)
function methodNotAllowed(req, res) {
    res.status(405).json({ error: "Method not allowed for that route" });
}

router.route('/')
    .get((req, res) => {
        userRepo.getAll()
            .then(users => {
                res.status(200).json({ users })
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err });
            });
    })
    .post(validate(validation.createUser), (req, res) => {
        const params = req.body;
        userRepo.create(params)
            .then(createdUser => {
                res.status(201).json({ createdUser });
            })
            .catch(err => {
                res.status(err.statusCode).json({ error : err });
            });
    })

    // In case method was not matched (= method not allowed)
    .all((req, res) => methodNotAllowed(req, res))
;

router.route('/:id')
    .get(validate(validation.getUser), (req, res) => {
        const id = req.params.id;
        userRepo.getOne(id)
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err });
            });
    })
    .delete(validate(validation.getUser), (req, res) => {
        const id = req.params.id;
        userRepo.delete(id)
            .then(deletedUser => {
                res.status(200).json({ deletedUser });
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err });
            });
    })
    .put(validate(validation.getUser), validate(validation.updateUser), (req, res) => {
        const id = req.params.id;
        const params = req.body;
        
        userRepo.update(id, params)
            .then(updatedUser => {
                res.status(200).json({ updatedUser });
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err });
            });
    })

    // In case method was not matched (= method not allowed)
    .all((req, res) => methodNotAllowed(req, res))
;

module.exports = router;