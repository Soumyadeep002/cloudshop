const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
    title: {type: String, required: true},
});


module.exports = mongoose.model("productcatagory", productCategorySchema);