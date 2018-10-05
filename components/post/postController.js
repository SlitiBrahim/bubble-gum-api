const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        // get posts
        res.send('GET /posts');
    })
    .get('/:id', (req, res) => {
        const id = req.params.id;
        // get a specific post
        res.send('GET /posts/' + id);
    })
    .post('/', (req, res) => {
        // create a new post
        res.send('POST on /posts');
    })
    .delete('/:id', (req, res) => {
        const id = req.params.id;
        // delete a specific post
        res.send('DELETE /posts/' + id);
    })
    .put('/:id', (req, res) => {
        const id = req.params.id;
        // alter a post
        res.send('PUT /posts/' + id);
    })
;

module.exports = router;