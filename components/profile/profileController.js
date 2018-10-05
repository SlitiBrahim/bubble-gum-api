const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        // get profiles
        res.send('GET /profiles');
    })
    .get('/:id', (req, res) => {
        const id = req.params.id;
        // get a specific profile
        res.send('GET /profiles/' + id);
    })
    .post('/', (req, res) => {
        // create a new profile
        res.send('POST on /profiles');
    })
    .delete('/:id', (req, res) => {
        const id = req.params.id;
        // delete a specific profile
        res.send('DELETE /profiles/' + id);
    })
    .put('/:id', (req, res) => {
        const id = req.params.id;
        // alter a profile
        res.send('PUT /profiles/' + id);
    })
;

module.exports = router;