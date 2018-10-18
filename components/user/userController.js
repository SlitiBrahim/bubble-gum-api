const express = require('express');
const router = express.Router();

const userRepo = require('./userRepository');

router
    .get('/', (req, res) => {
        userRepo.getAll()
            .then(users => {
                res.status(200).json({ users })
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err });
            });
    })

    .get('/:id', (req, res) => {
        const id = req.params.id;
        userRepo.getOne(id)
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err });
            });
    })

    .post('/', (req, res) => {
        const params = req.body;
        userRepo.create(params)
            .then(createdUser => {
                res.status(201).json({ createdUser });
            })
            .catch(err => {
                res.status(err.statusCode).json({ error : err });
            });
    })

    .delete('/:id', (req, res) => {
        const id = req.params.id;
        userRepo.delete(id)
            .then(deletedUser => {
                res.status(200).json({ deletedUser });
            })
            .catch(err => {
                res.status(err.statusCode).json({ error: err });
            });
    })

    .put('/:id', (req, res) => {
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
;

module.exports = router;