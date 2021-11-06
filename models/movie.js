const query = require('../db/mysql-connection');
const {multipleColumnSet} = require('../utils/common');
const Joi = require("joi");

class Movie {

    find = async (params = {}) => {
        let sql = `SELECT *
                   FROM movie`;

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
                     FROM movie
                     WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({title, genre_id, number_in_stock, daily_rental_rate}) => {
        const sql = `INSERT INTO movie (title, genre_id, number_in_stock, daily_rental_rate)
                     VALUES (?, ?, ?, ?)`;

        const result = await query(sql, [title, genre_id, number_in_stock, daily_rental_rate]);

        return result;
    }

    update = async (params, id) => {
        const {columnSet, values} = multipleColumnSet(params)

        const sql = `UPDATE movie
                     SET ${columnSet}
                     WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE
                     FROM movie
                     WHERE id = ?`;
        const result = await query(sql, [id]);

        return result;
    }

    validate(movie) {

        const schema = Joi.object({
            title: Joi.string().min(5).max(50).required(),
            genreId: Joi.number().required(),
            numberInStock: Joi.number().min(0).required(),
            dailyRentalRate: Joi.number().min(0).required()
        });

        return schema.validate(movie);
    }

    toDb = (movie) => {
        return {
            title: movie.title,
            genre_id: movie.genreId,
            number_in_stock: movie.numberInStock,
            daily_rental_rate: movie.dailyRentalRate,
        }
    }

    toApi = (movie) => {
        return {
            id: movie.id,
            title: movie.title,
            genreId: movie.genre_id,
            numberInStock: movie.number_in_stock,
            dailyRentalRate: movie.daily_rental_rate,
        }
    }
}

module.exports = new Movie();