const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// load .env file variable declarations into process.env
const envParse = dotenv.config();
if (envParse.error) { throw envParse.error; }

const app = express();
const config = require('./config/config');

// parse application/x-www-form-urlencoded data, extended :true allows rich data obj to be parsed
app.use(bodyParser.urlencoded({ extended: true }));
// parse request whith application/json content-type
app.use(bodyParser.json());

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