const mongoose = require("mongoose");

const Schema = mongoose.Schema;


  
const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: [{type:mongoose.Types.ObjectId, ref: 'address'}],
    token: {
        type: String
    }
});


module.exports = mongoose.model("customer", customerSchema);


