const express = require('express');
const router = express.Router();

const userRepo = require('./userRepository');

router
    .get('/', (req, res) => {
        userRepo.getAll()
            .then(users => {
                res.status(200).json(users)
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
        // create a new user
        res.send('POST /users/');
    })

    .delete('/:id', (req, res) => {
        const id = req.params.id;
        // delete user
        res.send('DELETE /users/' + id);
    })

    .put('/:id', (req, res) => {
        const id = req.params.id;
        // alter user
        res.send('PUT /users/' + id);
    })
;

module.exports = router;