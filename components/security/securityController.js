const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validate = require('express-validation');

const config = require('../../config/config');
const appSecret = config.secret;
const userRepo = require('../user/userRepository');
const validation = require('./securityValidate');

router.post('/login', validate(validation.login), (req, res) => {
    const { username, password } = req.body;

    userRepo.findOneByCredentials(username, password)
        .then(user => {
            if (user) {
                jwt.sign({ user }, appSecret, (err, token) => {
                    if (!err) {
                        res.status(200).json({ token });
                    }
                    else {
                        console.log("ERROR", err);
                        res.status(500).json({ error: err.message });
                    }
                });
            }
            else {
                res.status(401).json({ error: "Wrong credentials" });
            }
        })
        .catch(err => {
            res.status(err.statusCode).json({ error: "Wrong credentials" });
        });
});

module.exports = router;