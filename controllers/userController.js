const express = require('express');
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs");
const cookieParser = require("cookie-parser");
const randomstring = require("randomstring")
const nodemailer = require("nodemailer");

const app = express();

app.use(cookieParser());

const securePassword = async(password)=>{
    try {
        
        const hashPass = await bcryptjs.hash(password, 10);
        return hashPass;
    } catch (error) {
        res.status(400).send(error.message);
    }

    
}

const sendPasswordResetMail = async(email, token) =>{
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:process.env.MAIL_PORT,
            secure:false,
            requireTLS: true,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
        });

        const mailOptions ={
            from:process.env.MAIL_USER,
            to: email,
            subject: "Password Reset Link",
            html: '<p><a href="https://www.google.com/search?q='+token+'">Click here</a> to reset your Password</p>'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail Sent !!!", info.response);
                                
            }
        })


        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const createToken = async(id)=>{
    try {
        const token = await jwt.sign({_id:id}, process.env.JWT_SECRET)
        return token;
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const registerUser = async (req, res) => {
    try {
        const spass = await securePassword(req.body.password);

        const userData = await User.findOne({ email: req.body.email });

        if (userData) {
            res.status(200).send({ success: false, msg: "This email already exists" });
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: spass,
                type: req.body.type
            });

            const user_data = await user.save();
            res.status(200).send({ success: true, data: user_data });
        }

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.error(error.message);
    }
};

const loginUser= async(req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const userData = await User.findOne({
            email:email
        });

        if (userData) {
            const jwtToken = await createToken(userData._id)
            const passMatch = await bcryptjs.compare(password, userData.password);
            if (passMatch) {
                const userResult = {
                    _id: userData._id,
                    name:userData.name,
                    email:userData.email,
                    phone:userData.phone,
                    password:userData.password,
                    type:userData.type,
                    token: jwtToken
                }
                const response ={
                    success:true,
                    msg: "User Details",
                    data: userResult
                }
                res.cookie('jwt', jwtToken);
                res.status(200).send(response)

            } else {
                res.status(200).send({success:false, msg:"Incorrect Login Details"});
            }
        } else {
            res.status(200).send({success:false, msg:"Incorrect Login Details"});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const forgetPassword = async(req, res) =>{

    try {

        const email = req.body.email;
        const userData = await User.findOne({email: email});
        if (userData) {

            const randomString = randomstring.generate();

            sendPasswordResetMail(userData.email, randomString);

            const data = await User.updateOne(
                {
                email:email
                },
                {
                    $set:{
                        token:randomString
                    }
                });

            res.status(200).send({
                success: true,
                msg: "Password Reset Token has been set",
                mail: mailData
            })
            
        }else{
            res.status(200).send({
                success: true,
                msg: "No User found having this email. Register as New !!!"
            })
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }

}



module.exports = {
    registerUser,
    loginUser,
    forgetPassword
}