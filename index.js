require('dotenv').config();
const config = require('config');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

app.use(express.json());
app.use('/api/v1/genres', genres);
app.use('/api/v1/customers', customers);
app.use('/api/v1/movies', movies);
app.use('/api/v1/rentals', rentals);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);

const port = process.env.VIDLY_PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});