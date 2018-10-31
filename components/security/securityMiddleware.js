const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const appSecret = config.secret;

const middleware = {
    verifyToken: (req, res, next) => {
        // Authorization header holding the token
        const bearerHeader = req.headers['Authorization'] || req.headers['authorization'];
        // Bearer Header regex
        const tokenRegex = /^Bearer (([a-zA-Z0-9_-]*)+\.){2}([a-zA-Z0-9_-]*)+$/;
        // Authorization token was provided and it is bearer header template based
        if (typeof bearerHeader !== 'undefined' && tokenRegex.test(bearerHeader) === true) {
            // Authorization header representation: "Bearer <token>"
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