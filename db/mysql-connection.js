const mysql2 = require("mysql2");
const config = require('config');
const winston = require("winston");

class DBConnection {
    constructor() {
        this.db = mysql2.createPool({
            host: config.get('db.host'),
            user: config.get('db.user'),
            password: config.get('db.password'),
            database: config.get('db.name'),
            port: config.get('db.port'),
        });

        this.checkConnection();
    }

    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    throw new Error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    throw new Error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    throw new Error('Database connection was refused.');
                }
            }

            const db = config.get('db.name');
            const host=config.get('db.host');
            const port = config.get('db.port')
            winston.info(`Connected to ${db} on ${host}: port ${port}`);

            if (connection) {
                connection.release();
            }
            return
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            // execute will internally call prepare and query
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }
}

// like ENUM
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});


module.exports = new DBConnection().query;