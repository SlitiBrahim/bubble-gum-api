const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        // get users
        res.send('GET /users/');
    })

    .get('/:id', (req, res) => {
        const id = req.params.id;
        // get user
        res.send('GET /users/' + id);
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