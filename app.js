const express = require('express')
const app = express()

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/api', userRouter);

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/cloudeshop");

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.listen(3000, ()=>{
    console.log("Server Running");
})