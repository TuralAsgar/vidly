const express = require('express');
const router = express.Router();
const Movie = require('../models/movie')


router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.post('/', async (req, res) => {
    const {error} = Movie.validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const movie = Movie.toDb(req.body);

    const {affectedRows: saved, insertId} = await Movie.create(movie);
    if (saved) return res.send(Movie.toApi({...movie, id: insertId}));

    res.status(500).send('Movie can\'t be saved');
});

router.put('/:id', async (req, res) => {
    const movie = await Movie.findOne({id: parseInt(req.params.id)})
    if (!movie) return res.status(404).send('The movie with the given ID not found');

    const {error} = Movie.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {affectedRows: updated} = await Movie.update(Movie.toDb(req.body), req.params.id);

    if (updated) {
        const updatedMovie = await Movie.findOne({id: parseInt(req.params.id)});
        return res.send(Movie.toApi(updatedMovie));
    }

    res.status(500).send('Movie not updated. Error occurred');
});


router.delete('/:id', async (req, res) => {
    const movie = await Movie.findOne({id: req.params.id});
    if (!movie) return res.status(404).send('The movie with the given ID not found');

    const affectedRows = await Movie.delete(req.params.id);
    if (affectedRows) return res.send(Movie.toApi(movie));

    res.status(500).send('Movie not deleted. Error occurred');
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findOne({id: parseInt(req.params.id)});
    if (!movie) return res.status(404).send('The movie with the given ID not found');

    res.send(Movie.toApi(movie));
});


module.exports = router;