const winston = require('winston');
const express = require('express');
const config = require('config');
const app = express();

require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/config')();


const port = config.get('port');
app.listen(port, () => {
    winston.info(`Listening on port ${port}`)
});