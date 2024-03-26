// const express = require('express');
const Customer = require("../models/customerModel");
const Address = require("../models/addressModel");

// const app = express();

const registerCustomer = async (req, res) => {
    try {
        
        const customerData = await Customer.findOne({ phone: req.body.phone });

        if (customerData) {
            res.status(200).send({ success: false, msg: "This Customer already exists" });
        } else
         {
            const address = new Address({
                    street: req.body.address.street,
                    city: req.body.address.city,
                    pincode: req.body.address.pincode,
                    state: req.body.address.state,
                    country: req.body.address.country
            });
            const address_data = await address.save();

            const customer = new Customer({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: address._id
            });

            const customer_data = await customer.save();
            res.status(200).send({ success: true, data: customer_data, address: address_data });
        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.error(error.message);
    }
};

const viewCustomers = async (req, res) =>{
    try {
        const customersData = await Customer.find().populate('address');
        
        res.status(200).send({ success: true, data: customersData});
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.error(error.message);
    }
}



module.exports = {
    registerCustomer,
    viewCustomers
}