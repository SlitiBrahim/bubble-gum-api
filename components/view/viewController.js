const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        // get views
        res.send('GET /views');
    })
    .get('/:id', (req, res) => {
        const id = req.params.id;
        // get a specific view
        res.send('GET /views/' + id);
    })
    .post('/', (req, res) => {
        // create a new view
        res.send('POST on /views');
    })
    .delete('/:id', (req, res) => {
        const id = req.params.id;
        // delete a specific view
        res.send('DELETE /views/' + id);
    })
    .put('/:id', (req, res) => {
        const id = req.params.id;
        // alter a view
        res.send('PUT /views/' + id);
    })
;

module.exports = router;