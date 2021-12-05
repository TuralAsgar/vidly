require('dotenv').config()
const winston = require('winston');
const express = require('express');
const config = require('config');
const app = express();

require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/config')();


const port = config.get('port');
const server = app.listen(port, () => {
    winston.info(`NODE_ENV=${process.env.NODE_ENV ?? 'development'}`)
    winston.info(`Listening on port ${port}`)
});

module.exports = server;