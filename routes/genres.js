const express = require('express');
const router = express.Router();
const Joi = require("joi");
const Genre = require('../models/genre')


router.get('/', async (req, res) => {
    let genres = await Genre.find();
    res.send(genres);
});

router.post('/', async (req, res) => {
    const {error} = Genre.validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const genre = {
        name: req.body.name
    };

    let saved = await Genre.create(genre);
    if (saved) return res.send(genre);

    res.status(500).send('Genre can\'t be saved');
});

router.put('/:id', async (req, res) => {
    const genre = await Genre.findOne({id: parseInt(req.params.id)})
    if (!genre) return res.status(404).send('The genre with the given ID not found');

    const {error} = Genre.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let {affectedRows: updated} = await Genre.update(req.body, req.params.id)

    if (updated) return res.send({...genre, name: req.body.name});

    res.status(500).send('Genre not updated. Error occurred');
});


router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id = parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID not found');

    res.send(genre);
});



module.exports = router;