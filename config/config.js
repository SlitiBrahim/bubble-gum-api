const dbConfig = require('./db');

const env = process.env.NODE_ENV;

const config = {
    dev: {
        db: dbConfig[env],
        port: process.env.APP_PORT || 3000
    },
    prod: {
        db: dbConfig[env],
        port: process.env.APP_PORT || 3000
    }
};

module.exports = config[env];