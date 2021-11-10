const express = require('express');
const router = express.Router();
const Genre = require('../models/genre')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/', async (req, res) => {
    //throw new Error('Couldn\'t get genres');
    let genres = await Genre.find();
    res.send(genres);
});

router.post('/', auth, async (req, res) => {
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


router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findOne({id: req.params.id});
    if (!genre) return res.status(404).send('The genre with the given ID not found');

    const affectedRows = await Genre.delete(req.params.id);
    if (affectedRows) return res.send(genre);


    res.status(500).send('Genre not deleted. Error occurred');
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findOne({id: req.params.id});
    if (!genre) return res.status(404).send('The genre with the given ID not found');

    res.send(genre);
});


module.exports = router;