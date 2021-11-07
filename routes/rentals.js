const express = require('express');
const router = express.Router();
const Rental = require('../models/rental')
const Customer = require('../models/customer');
const Movie = require('../models/movie');


router.get('/', async (req, res) => {
    const rentals = await Rental.find();
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const {error} = Rental.validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findOne({id: req.body.customerId});
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findOne({id: req.body.movieId});
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.number_in_stock === 0) return res.status(400).send('Movie not in stock.');

    const rental = {...Rental.toDb(req.body), date_out: new Date(), rental_fee: movie.daily_rental_rate, date_returned: null};

    const {affectedRows: saved, insertId} = await Rental.create(rental);

    await Movie.update({number_in_stock: movie.number_in_stock - 1},movie.id)

    if (saved) return res.send(Rental.toApi({...rental, id: insertId}));

    res.status(500).send('Rental can\'t be saved');
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findOne({id: parseInt(req.params.id)});
    if (!rental) return res.status(404).send('The rental with the given ID not found');

    res.send(Rental.toApi(rental));
});


module.exports = router;