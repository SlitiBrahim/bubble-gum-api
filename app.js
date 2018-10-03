'use strict';

const express = require('express');

// Constants
const PORT = process.env.APP_PORT || 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello les bros\n');
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);