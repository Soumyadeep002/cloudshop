const express = require('express')
const user_route = express()

const body_parser = require("body-parser");
user_route.use(body_parser.json());
user_route.use(body_parser.urlencoded({extended:true}));


const userController = require("../controllers/userController");

user_route.post('/register', userController.registerUser);

module.exports = user_route;