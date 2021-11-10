const winston = require("winston");
require('express-async-errors');

module.exports = function () {

    winston.add(new winston.transports.Console({format: winston.format.simple()}))
    winston.add(new winston.transports.File({filename: 'logfile.log'}))


    // Call exceptions.handle with a transport to handle exceptions
    winston.exceptions.handle(
        new winston.transports.Console(),
        new winston.transports.File({filename: 'exceptions.log'})
    );

    // process.on('uncaughtException', (ex) => {
    //     console.log('We got an ucaught exceoption');
    //     winston.error(ex.message, ex);
    // })

    // process.on('unhandledRejection', (ex) => {
    //     console.log('We got an unhandled rejection');
    //     winston.error(ex.message, ex);
    // })

    process.on('unhandledRejection', (ex) => {
        throw ex;
    })

    // deliberately creating unhandled promise rejection
    // const p = Promise.reject(new Error('Something failed in promise rejection'));
    // p.then(() => console.log('done'));
}