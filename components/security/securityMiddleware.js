const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const appSecret = config.secret;

const middleware = {
    verifyToken: (req, res, next) => {
        // Authorization header holding the token
        const bearerHeader = req.headers['Authorization'] || req.headers['authorization'];
        // Authorization token was provided
        if (typeof bearerHeader !== 'undefined') {
            const token = bearerHeader.split(' ')[1];

            jwt.verify(token, appSecret, (err, decoded) => {
                if (!err) {
                    // to pass token to next middleware, could save decoded in res.locals

                    // allow request
                    next();
                } else {
                    res.status(401).json({ error: "Invalid token." });
                }
            });

        } else {
            res.status(401).json({ error: "Request not authorized. You must provide an 'Authorization' header with a valid token" });
        }
    }
};

module.exports = middleware;