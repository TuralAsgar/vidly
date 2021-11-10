const query = require('../db/mysql-connection');
const {multipleColumnSet} = require('../utils/common');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

class User {

    find = async (params = {}) => {
        let sql = `SELECT *
                   FROM user`;

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
                     FROM user
                     WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        if (result[0]) {
            this.id = result[0].id;
            this.isAdmin = !!result[0].is_admin;
            return {...this, ...result[0]};
        }

        // return back the first row (user)
        return null;
    }

    create = async ({name, email, password}) => {
        const sql = `INSERT INTO user (name, email, password)
                     VALUES (?, ?, ?)`;

        const result = await query(sql, [name, email, password]);

        return result;
    }

    update = async (params, id) => {
        const {columnSet, values} = multipleColumnSet(params)

        const sql = `UPDATE user
                     SET ${columnSet}
                     WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE
                     FROM user
                     WHERE id = ?`;
        const result = await query(sql, [id]);

        return result;
    }

    validate(user) {

        const schema = Joi.object({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).max(255).email().required(),
            password: Joi.string().min(5).max(255).required()
        });

        return schema.validate(user);
    }

    toDb = (user) => {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
        }
    }

    toApi = (user) => {
        return {
            name: user.name,
            email: user.email,
        }
    }

    generateAuthToken = () => {
        return jwt.sign({id: this.id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    }
}

module.exports = new User();