const express = require('express')
const user_route = express()

const body_parser = require("body-parser");
user_route.use(body_parser.json());
user_route.use(body_parser.urlencoded({extended:true}));


const userController = require("../controllers/userController");
const customerController = require("../controllers/customerController");
const productController = require("../controllers/productController");

const authUser = require("../middlewares/authUser");

user_route.post('/register', userController.registerUser);
user_route.post('/login', userController.loginUser);
user_route.post('/forget-password', userController.forgetPassword);
user_route.post('/register-customer', customerController.registerCustomer);
user_route.get('/customers', customerController.viewCustomers);
user_route.get('/delete-customers/:id', customerController.deleteCustomer);
user_route.post('/add-product', productController.addProduct);
user_route.get('/view-product', productController.viewProduct);
user_route.post('/add-product-category', productController.addProductCategory);
user_route.get('/view-product-category', productController.viewProductCategory);


user_route.get('/dashboard', authUser, function(req, res){
    res.status(200).send({
        success: true, 
        msg: "Authenticated"
    });
});

module.exports = user_route;