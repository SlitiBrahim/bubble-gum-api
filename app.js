const express = require('express');

const app = express();
// Controllers
const userController = require('./components/user/userController');

app.use('/users', userController);

// In case any controller was matched throw an error
app.use((req, res) => {
    // return json error
    res.status(404).json({
        message: "No route found for this resource or the HTTp verb is invalid, please refer to the documentation."
    });
});

module.exports = app;