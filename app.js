const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const expressValidation = require('express-validation');

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
const securityController = require('./components/security/securityController');

app.use('/users', userController);
app.use('/posts', postController);
app.use('/votes', voteController);
app.use('/views', viewController);
app.use('/profiles/', profileController);
// login and register routes
app.use(securityController);

app.use((req, res) => {
    // return json error
    res.status(404).json({
        message: "No route found for this resource or the HTTP verb is invalid, please refer to the documentation."
    });
});

// In case a validation error was thrown or any controller was matched
app.use((err, req, res, next) => {
    // validation error(s)
    if (err instanceof expressValidation.ValidationError) {
        // return error object containing all validation errors
        res.status(err.status).json(err);
    }
});

module.exports = app;