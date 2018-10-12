const dbConfig = require('./db');

const config = {
    db: dbConfig,
    port: process.env.APP_PORT
};

module.exports = config;