const _ = require('lodash');
const User = require('../models/user');
const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
    const user = await User.findOne({id: req.user.id});
    return res.send(_.pick(user, ['id', 'email', 'name']))
});

router.post('/', async (req, res) => {
        const {error} = await User.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email: req.body.email});
        if (user) return res.status(400).send('User already registered');

        user = _.pick(req.body, ['email', 'name', 'password']);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const {affectedRows: saved, insertId} = await User.create(user);

        if (saved) {
            user = await User.findOne({id: insertId});
            const token = user.generateAuthToken();
            return res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
        }

        return res.status(500).send('User not saved');
    }
);


module.exports = router;