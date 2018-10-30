const dbConfig = require('./db');

const config = {
    db: dbConfig,
    port: process.env.APP_PORT,
    secret: process.env.SECRET
};

module.exports = config;