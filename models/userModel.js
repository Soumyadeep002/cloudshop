const mongoose = require("mongoose");

const userSchemea = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:Number,
        required:true
    },
    token:{
        type:String,
    }


});

module.exports = mongoose.model("User", userSchemea);


