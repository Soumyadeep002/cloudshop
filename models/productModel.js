const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {type: String, required: true},
    category:[{type: mongoose.Types.ObjectId, ref: 'productcatagory'}],
    purchase_price: {type: String, required: true},
    selling_price: {type: String, required: true},
    stock: {type: String, required: true}
});


module.exports = mongoose.model("product", productSchema);