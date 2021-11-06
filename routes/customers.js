const express = require('express');
const router = express.Router();
const Customer = require('../models/customer')


router.get('/', async (req, res) => {
    const customers = await Customer.find();
    const formedCustomers = customers.map(c => {
        return Customer.toApi(c);
    })
    res.send(formedCustomers);
});

router.post('/', async (req, res) => {
    const {error} = Customer.validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const customer = Customer.toDb(req.body);

    let {affectedRows: saved, insertId} = await Customer.create(customer);
    if (saved) return res.send(Customer.toApi({...customer, id: insertId}));

    res.status(500).send('Customer can\'t be saved');
});

router.put('/:id', async (req, res) => {
    const customer = await Customer.findOne({id: parseInt(req.params.id)})
    if (!customer) return res.status(404).send('The customer with the given ID not found');

    const {error} = Customer.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let {affectedRows: updated} = await Customer.update(Customer.toDb(req.body), req.params.id)

    const updatedCustomer = await Customer.findOne({id: parseInt(req.params.id)})


    if (updated) return res.send(Customer.toApi(updatedCustomer));

    res.status(500).send('Customer not updated. Error occurred');
});


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findOne({id: req.params.id});
    if (!customer) return res.status(404).send('The customer with the given ID not found');

    const {affectedRows} = await Customer.delete(req.params.id);
    if (affectedRows) return res.send(Customer.toApi(customer));


    res.status(500).send('Customer not deleted. Error occurred');
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findOne({id: parseInt(req.params.id)});
    if (!customer) return res.status(404).send('The customer with the given ID not found');

    res.send(Customer.toApi(customer));
});


module.exports = router;