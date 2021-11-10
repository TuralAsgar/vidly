require('dotenv').config();
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/config')();


const port = process.env.VIDLY_PORT || 3000;
app.listen(port, () => {
    winston.info(`Listening on port ${port}`)
});