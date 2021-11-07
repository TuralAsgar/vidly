const query = require('../db/mysql-connection');
const {multipleColumnSet} = require('../utils/common');
const Joi = require("joi");

class Rental {

    find = async (params = {}) => {
        let sql = `SELECT *
                   FROM rental`;

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
                     FROM rental
                     WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({customer_id, movie_id, date_out, date_returned, rental_fee}) => {
        const sql = `INSERT INTO rental (customer_id, move_id, date_out, date_returned, rental_fee)
                     VALUES (?, ?, ?, ?, ?)`;

        const result = await query(sql, [customer_id, movie_id, date_out || null, date_returned || null, rental_fee || null]);

        return result;
    }

    update = async (params, id) => {
        const {columnSet, values} = multipleColumnSet(params)

        const sql = `UPDATE rental
                     SET ${columnSet}
                     WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE
                     FROM rental
                     WHERE id = ?`;
        const result = await query(sql, [id]);

        return result;
    }

    validate(rental) {

        const schema = Joi.object({
            customerId: Joi.number().min(1).required(),
            movieId: Joi.number().min(1).required(),
        });

        return schema.validate(rental);
    }

    toDb = (rental) => {
        return {
            customer_id: rental.customerId,
            movie_id: rental.movieId,
        }
    }

    toApi = (rental) => {
        return {
            customerId: rental.customer_id,
            movieId: rental.movie_id
        }
    }
}

module.exports = new Rental();