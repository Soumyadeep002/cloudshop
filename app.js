const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

app.use(cors({
    origin: "*",
}))

app.use('/', indexRouter);
app.use('/api', userRouter);

const mongoose = require("mongoose");
mongoose.connect(process.env.DBHOST);


// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.listen(process.env.PORT, ()=>{
    console.log(`Server Running on PORT:${process.env.PORT}`);
})