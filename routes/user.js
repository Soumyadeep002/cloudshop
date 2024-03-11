const express = require('express')
const user_route = express()

const body_parser = require("body-parser");
user_route.use(body_parser.json());
user_route.use(body_parser.urlencoded({extended:true}));


const userController = require("../controllers/userController");


user_route.post('/register', userController.registerUser);
user_route.post('/login', userController.loginUser);

const authUser = require("../middlewares/authUser");

user_route.get('/dashboard', authUser, function(req, res){
    res.status(200).send({
        success: true, 
        msg: "Authenticated"
    });
});

module.exports = user_route;