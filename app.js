const express = require('express');

const app = express();
// Controllers
const userController = require('./components/user/userController');

app.use('/users', userController);

module.exports = app;