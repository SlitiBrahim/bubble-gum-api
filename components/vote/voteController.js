const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        // get votes
        res.send('GET /votes');
    })
    .get('/:id', (req, res) => {
        const id = req.params.id;
        // get a specific vote
        res.send('GET /votes/' + id);
    })
    .post('/', (req, res) => {
        // create a new vote
        res.send('POST /votes/');
    })
    .delete('/:id', (req, res) => {
        const id = req.params.id;
        // delete a vote
        res.send('DELETE /votes/' + id);
    })
    .put('/:id', (req, res) => {
        const id = req.params.id;
        // alter a vote
        res.send('PUT /votes/' + id);
    })
;

module.exports = router;