const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: String,
    city: String,
    pincode: String,
    state: String,
    country: String
});


module.exports = mongoose.model("address", addressSchema);