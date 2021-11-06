const query = require('../db/mysql-connection');
const {multipleColumnSet} = require('../utils/common');
const Joi = require("joi");

class Customer {

    tableName = 'customer';

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

    create = async ({name, is_gold, phone}) => {
        const sql = `INSERT INTO ${this.tableName} (name, is_gold, phone)
                     VALUES (?, ?, ?)`;

        const result = await query(sql, [name, is_gold, phone]);

        return result;
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

        return result;
    }

    validate = (customer) => {

        const schema = Joi.object({
            name: Joi.string().min(5).max(50).required(),
            phone: Joi.string().min(5).max(50).required(),
            isGold: Joi.boolean()
        });

        return schema.validate(customer);
    }

    toDb = (customer) => {
        return {
            name: customer.name,
            is_gold: customer.isGold,
            phone: customer.phone,
        }
    }

    toApi = (customer) => {
        return {
            id: customer.id,
            name: customer.name,
            isGold: customer.is_gold,
            phone: customer.phone,
        }
    }
}

module.exports = new Customer();