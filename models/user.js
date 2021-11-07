const query = require('../db/mysql-connection');
const {multipleColumnSet} = require('../utils/common');
const Joi = require("joi");

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

        // return back the first row (user)
        return result[0];
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
            email: Joi.string().min(5).max(255).email(),
            password: Joi.string().min(5).max(255)
        });

        return schema.validate(user);
    }

    toDb = (user) => {
        return {
            title: user.title,
            genre_id: user.genreId,
            number_in_stock: user.numberInStock,
            daily_rental_rate: user.dailyRentalRate,
        }
    }

    toApi = (user) => {
        return {
            id: user.id,
            title: user.title,
            genreId: user.genre_id,
            numberInStock: user.number_in_stock,
            dailyRentalRate: user.daily_rental_rate,
        }
    }
}

module.exports = new User();