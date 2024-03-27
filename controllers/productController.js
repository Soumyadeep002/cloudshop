// const express = require('express');
const Product = require("../models/productModel");
const ProductCategory = require("../models/productCategoryModel");

// const app = express();

const addProduct = async (req, res) => {
    try {
        
            // const address = new Address({
            //         street: req.body.address.street,
            //         city: req.body.address.city,
            //         pincode: req.body.address.pincode,
            //         state: req.body.address.state,
            //         country: req.body.address.country
            // });
            // const address_data = await address.save();

            const product = new Product({
                title: req.body.title,
                productcatagory: req.body.category,
                purchase_price: req.body.purchase_price,
                selling_price: req.body.selling_price,
                stock: req.body.stock
            });

            const product_data = await product.save();
            res.status(200).send({ success: true, data: product_data});
        

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.error(error.message);
    }
};

const viewProduct = async (req, res) =>{
    try {
        const ProductData = await Product.find().populate({ path: 'productcatagory' });
        
        res.status(200).send({ success: true, data: ProductData});
        
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.error(error.message);
    }
}

const addProductCategory = async (req, res) => {
    try {
        const productCategory = new ProductCategory({
                title: req.body.title,
            });

            const productCategory_data = await productCategory.save();
            res.status(200).send({ success: true, data: productCategory_data});
        

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.error(error.message);
    }
};

const viewProductCategory = async (req, res) => {
    try {
        const categoryData = await ProductCategory.find();
        
        res.status(200).send({ success: true, data: categoryData});
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
        console.error(error.message);
    }
}





// const viewProduct = async (req, res) =>{
//     try {
//         const customersData = await Customer.find().populate('address');
        
//         res.status(200).send({ success: true, data: customersData});
//     } catch (error) {
//         res.status(400).send({ success: false, msg: error.message });
//         console.error(error.message);
//     }
// }



module.exports = {
    addProduct,
    addProductCategory,
    viewProductCategory,
    viewProduct
}