const query = require('../db/mysql-connection');
const {multipleColumnSet} = require('../utils/common.utils');

class GenreModel {
    tableName = 'genre';

    find = async (params = {}) => {
        let sql = `SELECT *
                   FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const {columnSet, values} = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const {columnSet, values} = multipleColumnSet(params)

        const sql = `SELECT *
                     FROM ${this.tableName}
                     WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({name}) => {
        const sql = `INSERT INTO ${this.tableName} (name)
                     VALUES (?)`;

        const result = await query(sql, [name]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const {columnSet, values} = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName}
                     SET ${columnSet}
                     WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE
                     FROM ${this.tableName}
                     WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new GenreModel();