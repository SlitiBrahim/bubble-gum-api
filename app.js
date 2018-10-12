const express = require('express');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// load .env file variable declarations into process.env
const envParse = dotenv.config();
if (envParse.error) { throw envParse.error; }

const app = express();
const config = require('./config/config');

const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.pass}@${config.db.host}:${config.db.port}/${config.db.name}`);

// Controllers
const userController = require('./components/user/userController');
const postController = require('./components/post/postController');
const voteController = require('./components/vote/voteController');
const viewController = require('./components/view/viewController');
const profileController = require('./components/profile/profileController');

app.use('/users', userController);
app.use('/posts', postController);
app.use('/votes', voteController);
app.use('/views', viewController);
app.use('/profiles/', profileController);

// In case any controller was matched throw an error
app.use((req, res) => {
    // return json error
    res.status(404).json({
        message: "No route found for this resource or the HTTp verb is invalid, please refer to the documentation."
    });
});

module.exports = app;